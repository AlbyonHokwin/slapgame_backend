import { Router } from 'express';
import { validate } from '@/validation/validate';
import { createGameSchema } from '@/validation/games.schema';
import { createGame } from '../controllers/games.controller';

const router = Router();

router.post('/new', validate(createGameSchema), createGame);

export default router;