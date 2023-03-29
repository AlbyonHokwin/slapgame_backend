import type { UserWithId } from './User';

type UserId = UserWithId['id'];

type BaseGameData = {
  hostId: UserId;
  cardDeckId: number;
  penaltyPrice: number;
  strikeNumber: number;
}

type PrivateData<T = boolean> = T extends true ?
  {
    isPrivate: T;
    password: string;
  } : {
    isPrivate: T;
    password: null;
  }

export type GameData = BaseGameData & PrivateData;

export type Game = GameData & {
  id: number;
  date: Date;
}
