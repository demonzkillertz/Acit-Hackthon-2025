import { Request, Response } from 'express';
import * as reviewModel from '../models/reviewModel';

export async function addReview(req: Request, res: Response) {
  try {
    const { userId, busId, rating, comment } = req.body;
    const review = await reviewModel.addReview(userId, busId, rating, comment);
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add review', details: err });
  }
}

export async function getBusReviews(req: Request, res: Response) {
  try {
    const busId = parseInt(req.params.busId);
    const reviews = await reviewModel.getBusReviews(busId);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get reviews', details: err });
  }
}

export async function getUserReviews(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.userId);
    const reviews = await reviewModel.getUserReviews(userId);
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get reviews', details: err });
  }
}
