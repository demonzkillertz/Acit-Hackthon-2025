import { Router } from 'express';
import * as locationController from '../controllers/locationController';

const router = Router();

router.post('/', locationController.addLocation);
router.get('/:busId/latest', locationController.getLatestLocation);
router.get('/:busId', locationController.getBusLocations);

export default router;
