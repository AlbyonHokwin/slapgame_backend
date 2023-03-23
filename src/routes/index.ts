import { Router } from 'express';
import auth from './auth.route';
import games from './games.route';

const router = Router();

router.use('/auth', auth);
router.use('/games', games);

export default router;