import { Request, Response } from 'express';
import {
  getCompanyById, getCompanyBuses, getBusDetails, getBusTimeGaps,
  createCompany, updateCompany, deleteCompany,
  createBus, updateBus, deleteBus
} from '../models/companyModel';
export async function createCompanyHandler(req: Request, res: Response) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'name required' });
  const company = await createCompany(name);
  res.status(201).json(company);
}

export async function updateCompanyHandler(req: Request, res: Response) {
  const companyId = Number(req.params.companyId);
  const { name } = req.body;
  if (!companyId || !name) return res.status(400).json({ message: 'companyId and name required' });
  const company = await updateCompany(companyId, name);
  res.json(company);
}

export async function deleteCompanyHandler(req: Request, res: Response) {
  const companyId = Number(req.params.companyId);
  if (!companyId) return res.status(400).json({ message: 'companyId required' });
  await deleteCompany(companyId);
  res.json({ success: true });
}

export async function createBusHandler(req: Request, res: Response) {
  const { number, companyId, driverId, routeId } = req.body;
  if (!number || !companyId || !driverId || !routeId) return res.status(400).json({ message: 'number, companyId, driverId, routeId required' });
  const bus = await createBus(number, companyId, driverId, routeId);
  res.status(201).json(bus);
}

export async function updateBusHandler(req: Request, res: Response) {
  const busId = Number(req.params.busId);
  const { number, driverId, routeId } = req.body;
  if (!busId || !number || !driverId || !routeId) return res.status(400).json({ message: 'busId, number, driverId, routeId required' });
  const bus = await updateBus(busId, number, driverId, routeId);
  res.json(bus);
}

export async function deleteBusHandler(req: Request, res: Response) {
  const busId = Number(req.params.busId);
  if (!busId) return res.status(400).json({ message: 'busId required' });
  await deleteBus(busId);
  res.json({ success: true });
}

export async function getBuses(req: Request, res: Response) {
  const companyId = Number(req.query.companyId);
  if (!companyId) return res.status(400).json({ message: 'companyId required' });
  const buses = await getCompanyBuses(companyId);
  res.json(buses);
}

export async function getBusInfo(req: Request, res: Response) {
  const busId = Number(req.params.busId);
  if (!busId) return res.status(400).json({ message: 'busId required' });
  const bus = await getBusDetails(busId);
  res.json(bus);
}

export async function getTimeGaps(req: Request, res: Response) {
  const companyId = Number(req.query.companyId);
  const routeId = Number(req.query.routeId);
  if (!companyId || !routeId) return res.status(400).json({ message: 'companyId and routeId required' });
  const gaps = await getBusTimeGaps(companyId, routeId);
  res.json(gaps);
}
