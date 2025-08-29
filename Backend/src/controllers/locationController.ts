import { Request, Response } from 'express';
import * as locationModel from '../models/locationModel';

export async function addLocation(req: Request, res: Response) {
  try {
    const { busId, lat, lng } = req.body;
    const location = await locationModel.addLocation(busId, lat, lng);
    res.status(201).json(location);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add location', details: err });
  }
}

export async function getLatestLocation(req: Request, res: Response) {
  try {
    const busId = parseInt(req.params.busId);
    const location = await locationModel.getLatestLocation(busId);
    if (!location) return res.status(404).json({ error: 'Location not found' });
    res.json(location);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get location', details: err });
  }
}

export async function getBusLocations(req: Request, res: Response) {
  try {
    const busId = parseInt(req.params.busId);
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const locations = await locationModel.getBusLocations(busId, limit);
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get locations', details: err });
  }
}
