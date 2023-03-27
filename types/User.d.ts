export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
}

export interface UserWithPwd extends User {
  password: string;
}

export interface UserWithId extends User {
  id: number;
}

export interface FullUser extends User {
  id: number;
  password: string;
}