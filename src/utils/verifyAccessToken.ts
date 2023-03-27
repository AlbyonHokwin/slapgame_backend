import jwt from 'jsonwebtoken';
import type { JwtPayload, Secret } from 'jsonwebtoken';
import { VerificationTokenError } from './errors';

export const verifyAccessToken = async (token: string): Promise<jwt.JwtPayload> => {
  const secretKey: Secret = process.env.ACCESS_TOKEN_SECRET_KEY || 'myExtremelySecretKey';

  try {
    const decoded = await new Promise<JwtPayload>((resolve, reject) => {
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) reject(new VerificationTokenError(err.message));

        if (typeof decoded === 'undefined' || typeof decoded === 'string') reject(err);

        resolve(decoded as JwtPayload);
      })
    });

    return decoded;
  } catch (error) {
    throw error;
  }
};