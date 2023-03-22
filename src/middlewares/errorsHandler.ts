import { Request, Response, NextFunction } from 'express';
import { BaseError } from '@/utils/errors';

const errorsHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(err);
  }

  console.log('here :', err);

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({ error: err.message })
  }

  return res.status(500).json({ error: 'Internal error' });
}

export default errorsHandler;