import type { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { asyncHandler } from '@/utils/asyncHandler';
import { BadRequestError, FailedValidationError } from '@/utils/errors';
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

export const deleteGame = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);

  const isDelete = await Game.deleteById(id);
  if (!isDelete) throw new BadRequestError('No game to delete');

  res.status(200).json({ status: 'success' });
});