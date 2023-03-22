export abstract class BaseError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
};

export class NotFoundError extends BaseError {
  constructor(message: string = 'Not found') {
    super(404, message);
  }
};

export class BadRequestError extends BaseError {
  constructor(message: string = 'Bad request') {
    super(400, message);
  }
};