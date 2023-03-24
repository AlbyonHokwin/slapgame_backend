import type { Request } from 'express';
import { BadRequestError } from '@/utils/errors';
import { type ValidationChain, body } from 'express-validator';

export const addUserSchema: ValidationChain[] = [
  body('username').exists().withMessage('No username provided').bail()
    .trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters').bail()
    .isAlphanumeric(undefined, { ignore: ' -.' }).withMessage('Can only contains alphanumeric characters with whitespaces and -'),

  body('email').exists().withMessage('No email provided').bail()
    .trim().isEmail().withMessage('Add correct email').bail()
    .normalizeEmail(),

  body('password').exists().withMessage('No password provided').bail()
    .isLength({ min: 3 }).withMessage('Password needs to be at least 3 characters'),

  body('passwordConfirmation').exists().withMessage('No confirmation of password provided').bail()
    .custom((value, { req }) => value === req.body.password).withMessage('Password confirmation does not match password'),
];