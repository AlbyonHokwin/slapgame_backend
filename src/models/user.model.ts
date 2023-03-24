import { db } from './db';
import type { QueryResult } from 'pg';
import bcrypt from 'bcrypt';

import type { User, UserWithId, UserWithPwd } from '@@/types/User';

export const create = async ({ username, email, password }: UserWithPwd): Promise<UserWithId> => {
  const hash: string = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS || '', 10) || 10);

  const statement = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email';
  const values = [username, email, hash];

  try {
    const results: QueryResult = await db.query(statement, values);
    return results.rows[0];
  } catch (error) {
    throw error;
  }
};

export const findOneByEmail = async (email: User['email']): Promise<UserWithId | {}> => {
  const statement = 'SELECT id, username, email FROM users WHERE LOWER(email) = $1 LIMIT 1';
  const values = [email.toLowerCase()];

  try {
    const results: QueryResult = await db.query(statement, values);

    let foundUser: UserWithId | {} = {}

    results.rows.length > 0 && (foundUser = results.rows[0]);

    return foundUser;
  } catch (error) {
    throw error;
  }
}
