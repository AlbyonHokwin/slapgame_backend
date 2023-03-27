import { Router } from 'express';
import { validate } from '@/validation/validate';
import { addUserSchema, userSchema } from '@/validation/schemas';
import { signup, signin, refreshToken } from '@/controllers/auth.controller';

const router = Router();

router.post('/signup', validate(addUserSchema), signup);
router.post('/signin', validate(userSchema), signin);
router.post('/refresh', refreshToken);

export default router;