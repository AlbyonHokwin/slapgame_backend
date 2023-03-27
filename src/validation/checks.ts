import { type ValidationChain, body } from 'express-validator';

export const checkEmail: ValidationChain = body('email').exists().withMessage('No email provided').bail()
  .trim().isEmail().withMessage('Add correct email').bail()
  .normalizeEmail();

export const checkPassword: ValidationChain = body('password').exists().withMessage('No password provided').bail()
  .isLength({ min: 3 }).withMessage('Password needs to be at least 3 characters');

