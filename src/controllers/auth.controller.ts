import { asyncHandler } from '@/utils/asyncHandler';
import { AuthorizationError, ConflictRequestError } from '@/utils/errors';
import bcrypt from 'bcrypt';
import * as User from '../models/user.model';
import * as RefreshToken from '../models/token.model';

import type { Request, Response } from 'express';
import type { FullUser, UserWithId, UserWithPwd } from '@@/types/User';
import { createAccessToken } from '@/utils/createAccessToken';

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const newUser: UserWithPwd = { username, email, password };
  const isEmailAlreadyUsed = await User.emailAlreadyUsed(email);

  if (isEmailAlreadyUsed) {
    throw new ConflictRequestError('Email is already used');
  }

  const createdUser: UserWithId = await User.create(newUser);

  const refreshToken = await RefreshToken.create(createdUser.id);
  const accessToken = await createAccessToken(createdUser.id);

  res.status(201).json({
    status: 'success',
    username: createdUser.username,
    email: createdUser.email,
    access_token: accessToken,
    refresh_token: refreshToken,
  });
});

export const signin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user: FullUser | undefined = await User.findOneByEmail(email);

  if (!user) throw new AuthorizationError('Invalid e-mail or password');

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) throw new AuthorizationError('Invalid e-mail or password');

  await RefreshToken.revokeAllForId(user.id);
  const refreshToken = await RefreshToken.create(user.id);
  const accessToken = await createAccessToken(user.id);

  res.status(201).json({
    status: 'success',
    username: user.username,
    email: user.email,
    access_token: accessToken,
    refresh_token: refreshToken,
  });
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  res.json('refreshToken');
});