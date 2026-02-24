/**
 * HTTP errors for controllers/services; errorHandler uses statusCode.
 */
export class HttpError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export function badRequest(message: string): HttpError {
  return new HttpError(message, 400);
}

export function notFound(message: string): HttpError {
  return new HttpError(message, 404);
}
