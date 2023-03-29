import type { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { asyncHandler } from '@/utils/asyncHandler';
import { FailedValidationError } from '@/utils/errors';
import * as Game from '../models/game.model';

export const createGame = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let { hostId, cardDeckId, penaltyPrice, strikeNumber, isPrivate, password } = req.body;

  if (isPrivate) {
    await body('password').exists().withMessage('Password is required for private game').bail()
      .isLength({ min: 3 }).withMessage('Password needs to be at least 3 characters').run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) next(new FailedValidationError(errors.array()));
  } else password = null;

  const createdGame = await Game.create({ hostId, cardDeckId, penaltyPrice, strikeNumber, isPrivate, password });
  console.log(createdGame);

  res.json('createGame');
});

export const getAllGames = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const allGames = await Game.getAll();
  res.json({ allGames });
});