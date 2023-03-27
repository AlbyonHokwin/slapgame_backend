import type { Request, Response, NextFunction } from 'express';
import { FailedValidationError } from '@/utils/errors';
import { type ValidationChain, validationResult } from 'express-validator';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    next(new FailedValidationError(errors.array()));
  };
};