import { UserWithId } from '@@/types/User';
import jwt from 'jsonwebtoken';
import type { Secret } from 'jsonwebtoken';

export const createAccessToken = async (userId: UserWithId['id']): Promise<string> => {
  const secretKey: Secret = process.env.ACCESS_TOKEN_SECRET_KEY || 'myExtremelySecretKey';

  try {
    const token = await new Promise<string>((resolve, reject) => {
      jwt.sign({ sub: userId }, secretKey,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '0',
        },
        (err, token) => {
          if (err || typeof token === 'undefined') reject(err);

          resolve(token as string);
        }
      );
    });

    return token;
  } catch (error) {
    throw error;
  }
};