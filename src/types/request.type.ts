import { Request, Response } from 'express';

export interface IRequest {
  req: Request,
  res: Response
}

