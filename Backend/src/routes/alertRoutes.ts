import { Router } from 'express';
import * as alertController from '../controllers/alertController';

const router = Router();

router.post('/', alertController.addAlert);
router.get('/bus/:busId', alertController.getBusAlerts);
router.get('/user/:userId', alertController.getUserAlerts);

export default router;
