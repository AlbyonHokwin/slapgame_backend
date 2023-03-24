import { asyncHandler } from '@/utils/asyncHandler';
import * as User from '../models/user.model';

import type { Request, Response } from 'express';
import type { UserWithPwd } from '@@/types/User';
import { ConflictRequestError } from '@/utils/errors';

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const newUser: UserWithPwd = { username, email, password };
  const isEmailAlreadyUsed = await User.emailAlreadyUsed(email);

  if (isEmailAlreadyUsed) {
    throw new ConflictRequestError('Email is already used');
  }

  const createdUser = await User.create(newUser);

  if (createdUser.id >= 0) {
    res.status(201).json({ result: { username: createdUser.username, email: createdUser.email } });
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