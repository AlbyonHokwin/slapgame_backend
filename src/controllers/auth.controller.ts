import type { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '@/utils/asyncHandler';

export const signup = asyncHandler((req: Request, res: Response) => {
  res.json('signup');
});

export const signin = asyncHandler((req: Request, res: Response) => {
  res.json('signin');
});

export const refreshToken = asyncHandler((req: Request, res: Response) => {
  res.json('refreshToken');
});