import { User } from '@prisma/client';
import prisma from '../utils/prisma';
import { hashedPassword } from '../utils/bcrypt';
import excludedFields from '../utils/excludeFields';
import { signToken } from '../utils/jwt';
import { comparePassword } from '../utils/bcrypt';

export class AuthService {
  public async registerUser(password: string, body: User) {
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

    return userWithoutPasswordEmail;
  };

  public async loginUser(password: string, email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (!user) {
      throw new Error('user or password incorrect');
    } else {
      const match = await comparePassword(password, user.password);
      if (!match) {
        throw new Error('password incorrect');
      } else {
        const userWithoutPasswordEmail = excludedFields(user, ['password', 'email']);
        const token = signToken({id: user.id, role: user.role});
        return {
          token,
          user: userWithoutPasswordEmail
        };
      };
    };
  };
};