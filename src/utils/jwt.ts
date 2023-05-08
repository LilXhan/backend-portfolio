import jwt from 'jsonwebtoken';
import { Payload } from '../types/payload.type';
import { config } from 'dotenv';

config();
export const signToken = (payload: Payload) => {
  const token = jwt.sign(
    { id: payload.id, rol: payload.role },
    process.env.SECRET_KEY!,
    { expiresIn: '10h' }
  );
  return token;
};

export const verifyToken = (token: string) => {
  const payload = jwt.verify(token, process.env.SECRET_KEY!);
  return payload;
};