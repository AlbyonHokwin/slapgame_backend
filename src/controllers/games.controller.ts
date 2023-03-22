import type { Request, Response, NextFunction } from 'express';
import * as Game from '../models/game.model';

export const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allGames = await Game.getAll();
    res.json({ allGames });
  } catch (error) {
    next(error);
  };
}