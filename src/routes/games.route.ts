import { Router } from 'express';
import { validate } from '@/validation/validate';
import { createGameSchema, startGameSchema, deleteGameSchema } from '@/validation/games.schema';
import { createGame, startGame, deleteGame } from '../controllers/games.controller';

const router = Router();

router.post('/new', validate(createGameSchema), createGame);
router.post('/start', validate(startGameSchema), startGame);
router.delete('/delete/:id', validate(deleteGameSchema), deleteGame);

export default router;