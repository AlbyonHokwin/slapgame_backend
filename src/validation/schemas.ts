import { type ValidationChain, body } from 'express-validator';
import { checkEmail, checkPassword } from './checks';

export const addUserSchema: ValidationChain[] = [
  body('username').exists().withMessage('No username provided').bail()
    .trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters').bail()
    .isAlphanumeric(undefined, { ignore: ' -.' }).withMessage('Can only contains alphanumeric characters with whitespaces and -'),

  checkEmail,
  checkPassword,

  body('passwordConfirmation').exists().withMessage('No confirmation of password provided').bail()
    .custom((value, { req }) => value === req.body.password).withMessage('Password confirmation does not match password'),
];

export const userSchema: ValidationChain[] = [
  checkEmail,
  checkPassword,
];