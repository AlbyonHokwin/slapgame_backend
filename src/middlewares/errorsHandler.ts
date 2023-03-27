import { Request, Response, NextFunction } from 'express';
import { BaseError } from '@/utils/errors';

const errorsHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(err);
  }

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({ status: 'error', error: err.message })
  }

  return res.status(500).json({ status: 'error', error: 'Internal error' });
}

export default errorsHandler;