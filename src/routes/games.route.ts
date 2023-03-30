import { Router } from 'express';
import { validate } from '@/validation/validate';
import { createGameSchema, deleteGameSchema } from '@/validation/games.schema';
import { createGame, deleteGame } from '../controllers/games.controller';

const router = Router();

router.post('/new', validate(createGameSchema), createGame);
router.delete('/delete/:id', validate(deleteGameSchema), deleteGame);

export default router;