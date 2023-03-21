import { db } from './db';

export const getAll = async () => {
  try {
    const games = await db.query('SELECT * FROM games');
    return games.rows;
  } catch (error) {
    console.log(error);
  }
}