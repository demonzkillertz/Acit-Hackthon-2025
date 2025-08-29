export type UserRole = 'user' | 'driver' | 'company' | 'admin';

export interface User {
  id: number;
  username: string;
  password: string;
  role: UserRole;
  email?: string;
  phone?: string;
  profile_pic?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
