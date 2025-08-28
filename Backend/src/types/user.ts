export type UserRole = 'user' | 'driver' | 'company';

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
}
