import { Router} from 'express';
import games from './games.route';

const router = Router();

router.use('/games', games);

export default router;