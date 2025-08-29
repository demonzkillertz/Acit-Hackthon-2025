import { Router } from 'express';
import * as waitlistController from '../controllers/waitlistController';

const router = Router();

router.post('/', waitlistController.addToWaitlist);
router.delete('/', waitlistController.removeFromWaitlist);
router.get('/bus/:busId', waitlistController.getBusWaitlist);

export default router;
