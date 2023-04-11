import type { Card } from '@@/types/Card';
import type { Deck } from '@@/types/Deck';
import type { Player, PlayerInfo } from '@@/types/Player';

export const dealingCardsToPlayers = (playersInfo: PlayerInfo[], deck: Deck): Player[] => {
  const players: Player[] = playersInfo.map(player => ({ ...player, deck: [] }));
  let leftCards = [...deck.cards];
  const numberOfPlayers = players.length;

  let indexOfPlayer = 0;
  while (!!leftCards[0]) {
    const randomIndexOfCard = Math.floor(leftCards.length * Math.random());
    const randomCard: Card = leftCards.splice(randomIndexOfCard, 1)[0];

    players[indexOfPlayer].deck.push(randomCard);
    indexOfPlayer++;
    indexOfPlayer %= numberOfPlayers;
  }

  return players;
}