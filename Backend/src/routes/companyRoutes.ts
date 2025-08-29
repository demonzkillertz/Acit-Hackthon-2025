import { Router } from 'express';
import {
	getBuses, getBusInfo, getTimeGaps,
	createCompanyHandler, updateCompanyHandler, deleteCompanyHandler,
	createBusHandler, updateBusHandler, deleteBusHandler,
	getAllCompaniesHandler, getCompanyHandler, getCompanyStatsHandler
} from '../controllers/companyController';

const router = Router();

// Public endpoints
router.get('/companies', getAllCompaniesHandler);
router.get('/company/:companyId', getCompanyHandler);
router.get('/company/:companyId/stats', getCompanyStatsHandler);

// Company CRUD
router.post('/company', createCompanyHandler);
router.put('/company/:companyId', updateCompanyHandler);
router.delete('/company/:companyId', deleteCompanyHandler);

// Bus CRUD
router.post('/bus', createBusHandler);
router.put('/bus/:busId', updateBusHandler);
router.delete('/bus/:busId', deleteBusHandler);

// GET /api/company/buses?companyId=1
router.get('/buses', getBuses);

// GET /api/company/bus/:busId
router.get('/bus/:busId', getBusInfo);

// GET /api/company/routes/gaps?companyId=1&routeId=2
router.get('/routes/gaps', getTimeGaps);

export default router;
