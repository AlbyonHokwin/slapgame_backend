import { Card } from './Card';

export interface PlayerInfo {
  id: number;
  username: string;
}

export interface Player extends PlayerInfo {
  deck: Card['id'][];
}