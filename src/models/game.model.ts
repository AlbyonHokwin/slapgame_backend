import { db } from './db';
import type { GameData, Game } from '@@/types/Game';

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

export const getAll = async () => {
  try {
    const games = await db.query('SELECT * FROM games');
    return games.rows;
  } catch (error) {
    throw error;
  }
}