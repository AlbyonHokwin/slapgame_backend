import { Request, Response, NextFunction } from 'express';

const errorsHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(err);
  }

  return res.status(500).json({ error: 'Erreur interne' });
}

export default errorsHandler;