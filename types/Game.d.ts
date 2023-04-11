import type { UserWithId } from './User';
import type { Player } from './Player';

type UserId = UserWithId['id'];

type BaseGameData = {
  hostId: UserId;
  cardDeckId: number;
  penaltyPrice: number;
  strikeNumber: number;
  maxPlayers: number;
  combinations: number[];
}

type PrivateData =
  {
    isPrivate: true;
    password: string;
  } | {
    isPrivate: false;
    password: null;
  }

export type GameData = BaseGameData & PrivateData;

export type Game = GameData & {
  id: number;
  date: Date;
  isStarted: boolean;
  players: Player[];
}
