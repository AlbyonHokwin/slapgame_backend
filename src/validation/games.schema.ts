import { type ValidationChain, body } from 'express-validator';

export const createGameSchema: ValidationChain[] = [
  body('hostId').exists().withMessage('No host ID provided').bail()
    .isNumeric().bail().toInt(),
  body('cardDeckId').exists().withMessage('No card deck ID provided').bail()
    .isNumeric().bail().toInt(),
  body('penaltyPrice').exists().withMessage('No penalty price provided').bail()
    .isNumeric().bail().toInt(),
  body('strikeNumber').exists().withMessage('No strike number provided').bail()
    .isNumeric().bail().toInt(),
  body('isPrivate').exists().withMessage('Privacy of the game is not provided').bail()
    .isBoolean().bail().toBoolean(),
];