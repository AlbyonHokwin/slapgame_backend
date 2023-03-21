import type { Request, Response } from 'express';
import * as Game from '../models/game.model';

export const getAllGames = async (req: Request, res: Response) => {
  const allGames = await Game.getAll();
  res.json(allGames);
}