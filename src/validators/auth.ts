import { check } from 'express-validator';

export const registerValidator = [
  check('name').exists().notEmpty().isLength({min: 5, max: 10}),
  check('username').exists().notEmpty().isLength({min: 5, max: 20}),
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().notEmpty().isLength({min: 8, max: 20}),
  check('role').exists().notEmpty().isLength({min: 4, max: 4})
];

export const loginValidator = [
  check('email').isEmail().notEmpty().exists(),
  check('password').notEmpty().exists().isLength({min: 8, max: 20})
];