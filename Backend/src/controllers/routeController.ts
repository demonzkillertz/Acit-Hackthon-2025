import { Request, Response } from 'express';
import * as routeModel from '../models/routeModel';

export async function createRoute(req: Request, res: Response) {
  try {
    const { name, polyline, stops } = req.body;
    const route = await routeModel.createRoute(name, polyline, stops);
    res.status(201).json(route);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create route', details: err });
  }
}

export async function updateRoute(req: Request, res: Response) {
  try {
    const routeId = parseInt(req.params.id);
    const { name, polyline, stops } = req.body;
    const route = await routeModel.updateRoute(routeId, name, polyline, stops);
    res.json(route);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update route', details: err });
  }
}

export async function deleteRoute(req: Request, res: Response) {
  try {
    const routeId = parseInt(req.params.id);
    await routeModel.deleteRoute(routeId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete route', details: err });
  }
}

export async function getRouteById(req: Request, res: Response) {
  try {
    const routeId = parseInt(req.params.id);
    const route = await routeModel.getRouteById(routeId);
    if (!route) return res.status(404).json({ error: 'Route not found' });
    res.json(route);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get route', details: err });
  }
}

export async function getAllRoutes(req: Request, res: Response) {
  try {
    const routes = await routeModel.getAllRoutes();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get routes', details: err });
  }
}
