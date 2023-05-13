import { check } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import validateData from '../utils/validator';

export const bodyValidator = [
  check('title').notEmpty().exists().isLength({min: 5, max: 40}),
  check('description').notEmpty().exists().isLength({min: 10, max: 100}),
  check('github').isURL().notEmpty().exists(),
  check('demo').isURL().optional(),
  check('tag').exists().notEmpty().isLength({min: 2, max: 2}),
  check('user_owner').exists().notEmpty().isEmail(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateData(req, res ,next);
  }
];

export const idValidator = [
  check('id').exists().isInt().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateData(req, res ,next);
  }
];