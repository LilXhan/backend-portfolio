import { Request, Response } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}