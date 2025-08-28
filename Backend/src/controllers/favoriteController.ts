import { Request, Response } from 'express';
import * as favoriteModel from '../models/favoriteModel';

export async function addFavorite(req: Request, res: Response) {
  try {
    const { userId, busId } = req.body;
    const favorite = await favoriteModel.addFavorite(userId, busId);
    res.status(201).json(favorite);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add favorite', details: err });
  }
}

export async function removeFavorite(req: Request, res: Response) {
  try {
    const { userId, busId } = req.body;
    await favoriteModel.removeFavorite(userId, busId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove favorite', details: err });
  }
}

export async function getUserFavorites(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.userId);
    const favorites = await favoriteModel.getUserFavorites(userId);
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get favorites', details: err });
  }
}
