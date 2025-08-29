import { Request, Response } from 'express';
import * as waitlistModel from '../models/waitlistModel';

export async function addToWaitlist(req: Request, res: Response) {
  try {
    const { busId, userId, stationId } = req.body;
    const entry = await waitlistModel.addToWaitlist(busId, userId, stationId);
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to waitlist', details: err });
  }
}

export async function removeFromWaitlist(req: Request, res: Response) {
  try {
    const { busId, userId, stationId } = req.body;
    await waitlistModel.removeFromWaitlist(busId, userId, stationId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from waitlist', details: err });
  }
}

export async function getBusWaitlist(req: Request, res: Response) {
  try {
    const busId = parseInt(req.params.busId);
    const waitlist = await waitlistModel.getBusWaitlist(busId);
    res.json(waitlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get waitlist', details: err });
  }
}
