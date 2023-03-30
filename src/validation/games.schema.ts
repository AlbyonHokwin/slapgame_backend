import { type ValidationChain, body, param } from 'express-validator';

export const createGameSchema: ValidationChain[] = [
  body('hostId').exists().withMessage('No host ID provided').bail()
    .isInt().bail().toInt(),
  body('cardDeckId').exists().withMessage('No card deck ID provided').bail()
    .isInt().bail().toInt(),
  body('penaltyPrice').exists().withMessage('No penalty price provided').bail()
    .isInt().bail().toInt(),
  body('strikeNumber').exists().withMessage('No strike number provided').bail()
    .isInt().bail().toInt(),
  body('isPrivate').exists().withMessage('Privacy of the game is not provided').bail()
    .isBoolean().bail().toBoolean(),
];

export const deleteGameSchema: ValidationChain[] = [
  param('id').isInt().withMessage('Parameter need to be an integer').bail().toInt(),
]