import { db } from './db';
import type { GameData, Game } from '@@/types/Game';

export const create = async ({ hostId, cardDeckId, penaltyPrice, strikeNumber, isPrivate, password, combinations }: GameData): Promise<Game> => {
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    const statement = `
      INSERT INTO games (host_id, card_deck_id, penalty_price, strike_number, is_private, password)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, host_id AS "hostId", date,card_deck_id AS "cardDeckId", penalty_price AS "penaltyPrice", strike_number AS "strikeNumber", is_private AS "isPrivate", password, is_started AS isStarted
    `;
    const values = [hostId, cardDeckId, penaltyPrice, strikeNumber, isPrivate, password];

    const results = await client.query(statement, values);
    const createdGame: Omit<Game, 'combinations' | 'players'> = results.rows[0];
    const gameId = createdGame.id;

    const combinationsResults = await Promise.all(combinations.map(async combination => {
      const joinStatement = `
        INSERT INTO games_combinations (game_id, combination_id)
          VALUES ($1, $2)
          RETURNING combination_id AS id
      `;
      const joinValues = [gameId, combination];
      return client.query(joinStatement, joinValues);
    }));

    await client.query('COMMIT');

    const game = {
      ...createdGame,
      combinations: combinationsResults.map(result => parseInt(result.rows[0].id, 10)),
      players: [],
    } as Game;

    return game;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
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
  const statement = 'SELECT * FROM games WHERE is_private = false AND is_started = false';

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
