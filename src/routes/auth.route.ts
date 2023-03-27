import { Router } from 'express';
import { validate } from '@/validation/validate';
import { signupSchema, signinSchema, signoutSchema, refreshTokenSchema } from '@/validation/schemas';
import { signup, signin, signout, refreshToken } from '@/controllers/auth.controller';

const router = Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/signin', validate(signinSchema), signin);
router.post('/signout', validate(signoutSchema), signout);
router.post('/refresh', validate(refreshTokenSchema), refreshToken);

export default router;