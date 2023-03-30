export interface PlayerInfo {
  id: number;
  username: string;
}

export interface Player extends PlayerInfo {
  deck: number[];
}