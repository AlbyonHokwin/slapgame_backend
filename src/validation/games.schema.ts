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
  body('combinations').toArray().customSanitizer((arr: Array<string>) => {
    const numberArr: number[] = [];
    arr.forEach(e => {
      const number = parseInt(e, 10);
      !isNaN(number) && numberArr.push(number);
    });
    return numberArr;
  }),
];

export const startGameSchema: ValidationChain[] = [
  body('gameId').exists().withMessage('No game ID provided').bail()
    .isInt().bail().toInt(),
  body('players').isArray({ min: 2 }).withMessage('Need at least 2 players').bail()
    .custom(players => players.every((player: { id: any; username: any; }) => !!parseInt(player.id, 10) && !!player.username)).withMessage('Please provide an id (-1 if no id) and username for each player').bail()
    .customSanitizer(players => players.map((player: { id: any; username: any; }) => ({ ...player, id: parseInt(player.id, 10) }))),
];

export const deleteGameSchema: ValidationChain[] = [
  param('id').isInt().withMessage('Parameter need to be an integer').bail().toInt(),
]