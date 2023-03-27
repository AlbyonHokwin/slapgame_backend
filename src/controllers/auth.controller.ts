import { asyncHandler } from '@/utils/asyncHandler';
import { ConflictRequestError } from '@/utils/errors';
import * as User from '../models/user.model';
import * as RefreshToken from '../models/token.model';

import type { Request, Response } from 'express';
import type { UserWithId, UserWithPwd } from '@@/types/User';
import { createAccessToken } from '@/utils/createAccessToken';
import { verifyAccessToken } from '@/utils/verifyAccessToken';

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const newUser: UserWithPwd = { username, email, password };
  const isEmailAlreadyUsed = await User.emailAlreadyUsed(email);

  if (isEmailAlreadyUsed) {
    throw new ConflictRequestError('Email is already used');
  }

  const createdUser: UserWithId = await User.create(newUser);

  if (!!createdUser) {
    const refreshToken = await RefreshToken.create(createdUser.id);
    const accessToken = await createAccessToken(createdUser.id);

    res.status(201).json({
      status: 'success',
      ...createdUser,
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    return;
  }

  throw new Error('Creation of new user failed');
});

export const signin = asyncHandler(async (req: Request, res: Response) => {
  res.json('signin');
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  res.json('refreshToken');
});