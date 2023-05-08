import { check } from 'express-validator';

export const bodyValidator = [
  check('title').notEmpty().exists().isLength({min: 5, max: 40}),
  check('description').notEmpty().exists().isLength({min: 10, max: 100}),
  check('github').isURL().notEmpty().exists(),
  check('demo').isURL().optional(),
  check('tag').exists().notEmpty().isLength({min: 2, max: 2}),
  check('user').exists().notEmpty().isEmail()
];

export const idValidator = [
  check('id').exists().isInt().notEmpty(),
];