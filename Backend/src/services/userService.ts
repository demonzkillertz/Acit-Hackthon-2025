import pool from '../config/db';
import bcrypt from 'bcryptjs';
import { User } from '../types/user';

export async function findUserByUsername(username: string): Promise<User | null> {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0] || null;
}

export async function createUser(username: string, password: string, role: string, email?: string): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (username, password, role, email) VALUES ($1, $2, $3, $4) RETURNING *',
    [username, hashedPassword, role, email || null]
  );
  return result.rows[0];
}

export async function validatePassword(user: User, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.password);
}
