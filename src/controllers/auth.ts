import { Request, Response } from 'express';
import handleErrorHttp from '../utils/errorHttp';
import { matchedData } from 'express-validator';
import prisma from '../utils/prisma';
import { hashedPassword, comparePassword } from '../utils/bcrypt';
import { signToken } from '../utils/jwt'; 
import excludedFields from '../utils/excludeFields';

export class AuthController {
  public async register(req: Request, res: Response) {
    try {
      const { password, ...body } = matchedData(req);
      const newPassword = await hashedPassword(password); 
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: newPassword,
          name: body.email,
          username: body.username
        }
      });

      const userWithoutPasswordEmail = excludedFields(user, ['password', 'email']);

      res.status(200).json({
        status: 'OK',
        data: userWithoutPasswordEmail
      });
    } catch (error: any) {
      handleErrorHttp(res, 400, error.message);
    };
  };

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = matchedData(req);
      const user = await prisma.user.findUnique({
        where: {
          email: email
        }
      });


      if (!user) {
        handleErrorHttp(res, 400, 'email or password incorrect');
      } else {
        const match = await comparePassword(password, user.password);
        if (!match) {
          handleErrorHttp(res, 400, 'password incorrect');
        } else {
          const userWithoutPasswordEmail = excludedFields(user, ['password', 'email']);
          res.status(200).json({
            status: 'OK',
            token: signToken({id: user.id, role: user.role}),
            data: userWithoutPasswordEmail
          });
        };
      };
    } catch (error: any) {
      handleErrorHttp(res, 400, error.message);      
    };
  };
};
