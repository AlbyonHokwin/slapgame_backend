import { Request, Response, Router } from 'express';
import { getAllGames } from '../controllers/games.controller';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json('ok');
});

router.get('/all', getAllGames);

export default router;