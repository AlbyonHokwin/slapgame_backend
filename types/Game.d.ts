import type { UserWithId } from './User';

type UserId = UserWithId['id'];

type BaseGameData = {
  hostId: UserId;
  cardDeckId: number;
  penaltyPrice?: number;
  strikeNumber?: number;
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

type AllIsRequired<T> = {
  [Property in keyof T]-?: T[Property];
}

export type Game = AllIsRequired<GameData> & {
  id: number;
  date: Date;
}
