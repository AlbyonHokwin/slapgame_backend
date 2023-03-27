import { db } from './db';
import bcrypt from 'bcrypt';

import type { FullUser, User, UserWithId, UserWithPwd } from '@@/types/User';

export const create = async ({ username, email, password }: UserWithPwd): Promise<UserWithId> => {
  const hash: string = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS || '', 10) || 10);

  const statement = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email';
  const values = [username, email, hash];

  try {
    const results = await db.query(statement, values);
    return results.rows[0];
  } catch (error) {
    throw error;
  }
};

export const findOneById = async (id: UserWithId['id']): Promise<UserWithId | undefined> => {
  const statement = 'SELECT id, username, email FROM users WHERE id = $1 LIMIT 1';
  const values = [id];

  try {
    const results = await db.query(statement, values);

    let foundUser: UserWithId | undefined = undefined;

    results.rows.length > 0 && (foundUser = results.rows[0]);

    return foundUser;
  } catch (error) {
    throw error;
  }
}

export const findOneByEmail = async (email: User['email']): Promise<FullUser | null> => {
  const statement = 'SELECT id, username, email, password FROM users WHERE LOWER(email) = $1 LIMIT 1';
  const values = [email.toLowerCase()];

  try {
    const results = await db.query(statement, values);

    if (results.rows.length === 0) return null;

    const userData = results.rows[0];

    return {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      password: userData.password,
    };
  } catch (error) {
    throw error;
  }
}

export const emailAlreadyUsed = async (email: User['email']): Promise<boolean> => {
  const statement = 'SELECT id, username, email FROM users WHERE LOWER(email) = $1 LIMIT 1';
  const values = [email.toLowerCase()];

  try {
    const results = await db.query(statement, values);

    return results.rows.length > 0;
  } catch (error) {
    throw error;
  }
}