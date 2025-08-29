import { Request, Response } from 'express';
import * as alertModel from '../models/alertModel';

export async function addAlert(req: Request, res: Response) {
  try {
    const { userId, busId, type, message } = req.body;
    const alert = await alertModel.addAlert(userId, busId, type, message);
    res.status(201).json(alert);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add alert', details: err });
  }
}

export async function getBusAlerts(req: Request, res: Response) {
  try {
    const busId = parseInt(req.params.busId);
    const alerts = await alertModel.getBusAlerts(busId);
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get alerts', details: err });
  }
}

export async function getUserAlerts(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.userId);
    const alerts = await alertModel.getUserAlerts(userId);
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get alerts', details: err });
  }
}
