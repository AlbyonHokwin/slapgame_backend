import { db } from './db';
import type { GameData, Game } from '@@/types/Game';
import { DatabaseError } from '@/utils/errors';

export const create = async ({ hostId, cardDeckId, penaltyPrice, strikeNumber, isPrivate, password }: GameData): Promise<Game> => {
  const statement = 'INSERT INTO games (host_id, card_deck_id, penalty_price, strike_number, is_private, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [hostId, cardDeckId, penaltyPrice, strikeNumber, isPrivate, password];

  try {
    const results = await db.query(statement, values);
    return results.rows[0];
  } catch (error) {
    throw error;
  }
}

export const findOneById = async (id: Game['id']): Promise<Game | null> => {
  const statement = 'SELECT * FROM games WHERE id = $1 LIMIT 1';
  const values = [id];

  try {
    const results = await db.query(statement, values);

    let foundGame: Game | null = null;

    results.rows.length > 0 && (foundGame = results.rows[0]);

    return foundGame;
  } catch (error) {
    throw error;
  }
}

export const findAllPublic = async (): Promise<Game[] | null> => {
  const statement = 'SELECT * FROM games WHERE is_private = false';

  try {
    const results = await db.query(statement);

    let foundGames: Game[] | null = null;

    results.rows.length > 0 && (foundGames = results.rows);

    return foundGames;
  } catch (error) {
    throw error;
  }
}

export const deleteById = async (id: Game['id']): Promise<boolean> => {
  const statement = 'DELETE FROM games WHERE id = $1';
  const values = [id];

  try {
    const results = await db.query(statement, values);
    return results.rowCount > 0;
  } catch (error) {
    throw error;
  }
}
