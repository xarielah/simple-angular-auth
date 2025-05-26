export interface User {
  username: string;
  email: string;
  token?: string;
}

export interface AuthUser {
  username: string;
  password: string;
  email: string;
}
