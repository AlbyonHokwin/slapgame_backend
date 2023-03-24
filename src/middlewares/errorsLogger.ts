import { Request, Response, NextFunction } from 'express';

const errorsLogger = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  next(err)
};

export default errorsLogger;
