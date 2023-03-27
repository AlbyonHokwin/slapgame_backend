import type { UserWithId } from './User';

export interface RefreshToken {
  token: string;
  user_id: UserWithId['id'];
  expires_at: Date;
  usable: boolean;
}