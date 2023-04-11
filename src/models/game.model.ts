import { db } from './db';
import type { GameData, Game } from '@@/types/Game';
import { DatabaseError } from '@/utils/errors';

export const create = async ({ hostId, cardDeckId, penaltyPrice, strikeNumber, isPrivate, password, combinations }: GameData): Promise<Game> => {
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    const statement = `
      INSERT INTO games (host_id, card_deck_id, penalty_price, strike_number, is_private, password)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, host_id AS "hostId", date,card_deck_id AS "cardDeckId", penalty_price AS "penaltyPrice", strike_number AS "strikeNumber", is_private AS "isPrivate", password, is_started AS "isStarted"
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

export const start = async (game: Game) => {
  // players.forEach(player => {
  //   console.log('id: ', player.id, player.username);
  //   const playerDeck = [...player.deck].sort((a, b) => a.id - b.id);
  //   console.table(playerDeck);
  // })

  const client = await db.connect();

  try {
    await client.query('BEGIN');

    game.players.forEach(async player => {
      let userId: number | null = player.id;
      userId === -1 && (userId = null);

      const insertCardStatement = `
        INSERT INTO player_decks (user_id, game_id, card_id, card_position)
          VALUES ($1, $2, $3, $4); 
      `;

      await Promise.all(player.deck.map(async (card, cardIndex) => {
        const insertCardValues = [userId, game.id, card.id, cardIndex];
        await client.query(insertCardStatement, insertCardValues);
      }));
    });

    const startGameStatement = `
      UPDATE games
        SET is_started = true
        WHERE id = $1
    `;
    const startGameValue = [game.id];

    const results = await client.query(startGameStatement, startGameValue);

    if (results.rowCount === 0) throw new DatabaseError('Game cannot start');

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export const findOneById = async (id: Game['id']): Promise<Game | null> => {
  const statement = `
    SELECT * FROM games_vw
    WHERE id = $1
  `;
  const values = [id];

  try {
    const results = await db.query(statement, values);

    if (results.rows.length === 0) return null;

    const foundGame: Game = results.rows[0];

    return foundGame;
  } catch (error) {
    throw error;
  }
}

export const findAllPublic = async (): Promise<Game[] | null> => {
  const statement = `
    SELECT * FROM games_vw
    WHERE isPrivate = false AND isStarted = false
  `;

  try {
    const results = await db.query(statement);

    if (results.rows.length === 0) return null;

    const foundGames: Game[] = results.rows;

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
