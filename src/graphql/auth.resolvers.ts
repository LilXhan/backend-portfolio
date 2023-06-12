import { ILogin, IRegister } from '../types/auth.type';
import { AuthService } from '../services/auth';
import { User } from '@prisma/client';

const authService = new AuthService();

export const login = async (_: any, { password, email }: ILogin) => {  
  return await authService.loginUser(password, email);
};

export const register = async (_: any, { dto }: IRegister) => {
  const {password, ...body} = dto;
  return await authService.registerUser(password, body as User);
};