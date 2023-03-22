import type { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '@/utils/errors';
import { asyncHandler } from '@/utils/asyncHandler';
import * as Game from '../models/game.model';

export const getAllGames = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const allGames = await Game.getAll();
  res.json({ allGames });
});