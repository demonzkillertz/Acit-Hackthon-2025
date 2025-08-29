import { Request, Response } from 'express';
import {
  getCompanyById, getCompanyBuses, getBusDetails, getBusTimeGaps,
  createCompany, updateCompany, deleteCompany,
  createBus, updateBus, deleteBus, getAllCompanies
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

// New endpoints
export async function getAllCompaniesHandler(req: Request, res: Response) {
  try {
    const companies = await getAllCompanies();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Failed to fetch companies' });
  }
}

export async function getCompanyHandler(req: Request, res: Response) {
  try {
    const companyId = Number(req.params.companyId);
    if (!companyId) return res.status(400).json({ message: 'companyId required' });
    
    const company = await getCompanyById(companyId);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    
    res.json(company);
  } catch (error) {
    console.error('Error fetching company:', error);
    res.status(500).json({ message: 'Failed to fetch company' });
  }
}

export async function getCompanyStatsHandler(req: Request, res: Response) {
  try {
    const companyId = Number(req.params.companyId);
    if (!companyId) return res.status(400).json({ message: 'companyId required' });
    
    // Get comprehensive company stats
    const busesResult = await getCompanyBuses(companyId);
    const totalBuses = busesResult.length;
    const activeBuses = busesResult.filter(bus => bus.latitude && bus.longitude).length;
    
    // Get routes count (simplified for now)
    const totalRoutes = busesResult.filter(bus => bus.route_name).length;
    
    // Mock data for now - you'd calculate these from actual reviews
    const stats = {
      totalBuses,
      activeBuses,
      totalRoutes,
      totalReviews: Math.floor(Math.random() * 50) + 10,
      averageRating: (Math.random() * 2 + 3).toFixed(1), // 3.0 - 5.0
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching company stats:', error);
    res.status(500).json({ message: 'Failed to fetch company stats' });
  }
}
