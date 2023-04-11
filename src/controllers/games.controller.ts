import type { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { asyncHandler } from '@/utils/asyncHandler';
import { BadRequestError, DatabaseError, FailedValidationError } from '@/utils/errors';
import * as User from '../models/user.model';
import * as Game from '../models/game.model';
import * as Card from '../models/card.model';
import type { PlayerInfo } from '@@/types/Player';
import { dealingCardsToPlayers } from '@/utils/dealingCardsToPlayers';

export const createGame = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let { hostId, cardDeckId, penaltyPrice, strikeNumber, isPrivate, password, combinations } = req.body;

  if (isPrivate) {
    await body('password').exists().withMessage('Password is required for private game').bail()
      .isLength({ min: 3 }).withMessage('Password needs to be at least 3 characters').run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) next(new FailedValidationError(errors.array()));
  } else password = null;

  const createdGame = await Game.create({ hostId, cardDeckId, penaltyPrice, strikeNumber, isPrivate, password, combinations });

  res.status(200).json({
    status: 'success',
    game: createdGame,
  });
});

export const startGame = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { gameId, players: playersInfo } = req.body;

  const game = await Game.findOneById(gameId);
  if (!game) throw new BadRequestError('No game found');
  if (game.isStarted) throw new BadRequestError('Game already started');

  let deck = await Card.findDeck(game.cardDeckId);
  if (!deck) throw new DatabaseError('No valid card deck used in game data');

  const checkedPlayersInfo: PlayerInfo[] = await Promise.all(playersInfo.map(async (playerInfo: PlayerInfo) => {
    if (playerInfo.id === -1) return playerInfo;

    const foundPlayer = await User.findOneById(playerInfo.id);

    if (!foundPlayer) return { ...playerInfo, id: -1 };

    return { ...playerInfo, username: foundPlayer.username };
  }))

  game.players = dealingCardsToPlayers(checkedPlayersInfo, deck);

  await Game.start(game);
  console.log(game);

  res.status(201).json({
    status: 'success',
    game
  });
});

export const deleteGame = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);

  const isDelete = await Game.deleteById(id);
  if (!isDelete) throw new BadRequestError('No game to delete');

  res.status(200).json({ status: 'success' });
});