import type { Request, Response, NextFunction } from 'express';

/**
 * Health module validation. GET health has no body/params to validate; export pattern for other modules.
 */
export function validateGetHealth(_req: Request, _res: Response, next: NextFunction): void {
  next();
}
