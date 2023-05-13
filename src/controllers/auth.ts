import { Request, Response } from 'express';
import handleErrorHttp from '../utils/errorHttp';
import { matchedData } from 'express-validator';
import { AuthService } from '../services/auth';
import { User } from '@prisma/client';

const authService = new AuthService();

export class AuthController {
  public async register(req: Request, res: Response) {
    try {
      const { password, ...body } = matchedData(req);
      const user = await authService.registerUser(password, body as User);
      res.status(200).json({
        status: 'OK',
        data: user
      });
    } catch (error: any) {
      handleErrorHttp(res, 400, error.message);
    };
  };

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = matchedData(req);
      const { token, user } = await authService.loginUser(password, email);
      res.status(200).json({
        status: 'OK',
        user: user,
        token: token
      });
    } catch (error: any) {
      handleErrorHttp(res, 400, error.message);      
    };
  };
};
