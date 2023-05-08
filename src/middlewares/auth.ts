import { Request, Response, NextFunction } from 'express';
import handleErrorHttp from '../utils/errorHttp';
import { verifyToken } from '../utils/jwt';
import prisma from '../utils/prisma';
import { Payload } from '../types/payload.type';
import excludedFields from '../utils/excludeFields';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ').pop();

    if (!token) {
      handleErrorHttp(res, 401, 'unauthorized');
    } else {
      const payload = verifyToken(token) as Payload;
      if (!payload) {
        handleErrorHttp(res, 401, 'unauthorized');
      } else {
        const user = await prisma.user.findUnique({
          where: {
            id: payload.id
          }
        });
        const userWithoutPasswordEmail = excludedFields(user, ['password', 'email']);
        req.user = userWithoutPasswordEmail;
        next();
      };
    };
  } catch (error) {
    handleErrorHttp(res, 401, 'unauthorized');
  };
};

export default authMiddleware;