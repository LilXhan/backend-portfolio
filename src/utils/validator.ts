import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import handleErrorHttp from './errorHttp';

const validateData = (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({
        status: 'FAILED',
        errors:  result.array()
      });
    } else {
      next();
    };
  } catch (error: any) {
    handleErrorHttp(res, 400, error.message);
  }
};

export default validateData;