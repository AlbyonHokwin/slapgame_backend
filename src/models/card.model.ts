import { db } from './db';
import type { Card } from '@@/types/Card';
import type { Deck } from '@@/types/Deck';

export const findDeck = async (id: Deck['id']): Promise<Deck | null> => {
  const statement = `
    SELECT * FROM card_decks_vw
      WHERE card_deck_id = $1
  `;
  const value = [id];

  try {
    const results = await db.query(statement, value);

    if (results.rows.length === 0) return null;

    const cards: Card[] = results.rows.map(cardResult => {
      const { card_deck_id, ...card } = cardResult;
      return card;
    });

    const deck: Deck = {
      id,
      cards,
    };

    return deck;
  } catch (error) {
    throw error;
  }
}