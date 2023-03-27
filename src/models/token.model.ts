import { db } from './db';
import { v4 as uuidv4 } from 'uuid';

import type { UserWithId } from '@@/types/User';

export const create = async (id: UserWithId['id']): Promise<string> => {
  const token: string = uuidv4();

  const today: Date = new Date();
  const expiresIn: number = parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN || '0', 10);
  const expiresAt: Date = new Date(today.getTime() + expiresIn);

  const statement = 'INSERT INTO tokens (token, expires_at, user_id) VALUES ($1, $2, $3) RETURNING token';
  const values = [token, expiresAt, id];

  try {
    const results = await db.query(statement, values);
    return results.rows[0].token;
  } catch (error) {
    throw error;
  }
};

export const verify = async (token: string, id: UserWithId['id']): Promise<boolean> => {
  const statement = 'SELECT token, user_id, usable, expires_at FROM tokens WHERE token = $1 AND user_id = $2 AND usable = true';
  const values = [token, id];

  try {
    const results = await db.query(statement, values);

    if (results.rows.length === 0) return false;
    const tokenData = results.rows[0];

    const today: Date = new Date();
    const expiresAt: Date = new Date(tokenData.expires_at);

    return today > expiresAt;
  } catch (error) {
    throw error;
  }
};

export const revokeOne = async (token: string): Promise<void> => {
  const statement = 'UPDATE tokens SET usable = false WHERE token = $1';
  const values = [token];

  try {
    await db.query(statement, values);
    return;
  } catch (error) {
    throw error;
  }
};

export const revokeAllForId = async (id: UserWithId['id']): Promise<void> => {
  const statement = 'UPDATE tokens SET usable = false WHERE user_id = $1';
  const values = [id];

  try {
    await db.query(statement, values);
    return;
  } catch (error) {
    throw error;
  }
};