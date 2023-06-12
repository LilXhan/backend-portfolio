import { Request, Response, NextFunction } from 'express';
import handleErrorHttp from '../utils/errorHttp';
import { User } from '@prisma/client';

export const checkRole = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role }: any = req.user;
    if (role === 'ADMIN') {
      next();
    } else {
      handleErrorHttp(res, 401, 'unauthorized');
    };
  } catch (error) {
    handleErrorHttp(res, 401, 'unauthorized');
  };
};

export const checkRoleGraphql = (user: User, res: Response) => {
  try {
    if (user.role === 'ADMIN') {
      return 'ok';
    } else {
      handleErrorHttp(res, 401, 'unauthorized');
    };
  } catch (error) {
    handleErrorHttp(res, 401, 'unauthorized');
  };
};