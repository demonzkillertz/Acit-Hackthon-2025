import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { findUserByUsername, createUser, validatePassword } from '../services/userService';

export async function register(req: Request, res: Response) {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const existing = await findUserByUsername(username);
    if (existing) return res.status(409).json({ message: 'Username already exists' });
    const user = await createUser(username, password, role);
    res.status(201).json({ id: user.id, username: user.username, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: (err as Error).message });
  }
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const user = await findUserByUsername(username);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const valid = await validatePassword(user, password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: (err as Error).message });
  }
}
