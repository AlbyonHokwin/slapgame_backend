import type { ValidationError } from 'express-validator';

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

export class FailedValidationError extends BadRequestError {
  errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super(errors.map(error => error.msg).join(' / '));
  }
};

export class ConflictRequestError extends BaseError {
  constructor(message: string) {
    super(409, message);
  }
};

export class VerificationTokenError extends BaseError {
  constructor(message: string) {
    super(401, message);
  }
};

export class AuthorizationError extends BaseError {
  constructor(message: string = 'Unauthorized') {
    super(401, message);
  }
};

export class DatabaseError extends BaseError {
  constructor(message: string = 'Error during database transaction') {
    super(500, message);
  }
};