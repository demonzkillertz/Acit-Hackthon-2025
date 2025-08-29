import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { findUserByUsername, createUser, validatePassword } from '../services/userService';

export async function register(req: Request, res: Response) {
  const { username, password, role, email } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required' });
  }
  try {
    const existing = await findUserByUsername(username);
    if (existing) return res.status(409).json({ message: 'Username already exists' });
    const user = await createUser(username, password, role, email);
    res.status(201).json({ id: user.id, username: user.username, role: user.role });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Registration failed', error: (err as Error).message });
  }
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  try {
    const user = await findUserByUsername(username);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const valid = await validatePassword(user, password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '2d' });
    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed', error: (err as Error).message });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    // Since we're using JWTs (stateless), we just return success
    // The frontend will handle removing the token from storage
    res.json({ message: 'Logout successful' });
  } catch (err) {
    res.status(500).json({ message: 'Logout failed', error: (err as Error).message });
  }
}
