import { type ValidationChain, body } from 'express-validator';
import { checkEmail, checkPassword } from './checks';

export const signupSchema: ValidationChain[] = [
  body('username').exists().withMessage('No username provided').bail()
    .trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters').bail()
    .isAlphanumeric(undefined, { ignore: ' -.' }).withMessage('Can only contains alphanumeric characters with whitespaces and -'),

  checkEmail,
  checkPassword,

  body('passwordConfirmation').exists().withMessage('No confirmation of password provided').bail()
    .custom((value, { req }) => value === req.body.password).withMessage('Password confirmation does not match password'),
];

export const signinSchema: ValidationChain[] = [
  checkEmail,
  checkPassword,
];

export const signoutSchema: ValidationChain[] = [
  checkEmail,
];

export const refreshTokenSchema: ValidationChain[] = [
  body('grant_type').exists().withMessage('grant_type field is required').bail()
    .equals('refresh_token'),

  body('refresh_token', 'No token provided').exists().bail()
    .notEmpty()
]