import { Router } from 'express';
import * as reviewController from '../controllers/reviewController';

const router = Router();

router.post('/', reviewController.addReview);
router.get('/bus/:busId', reviewController.getBusReviews);
router.get('/user/:userId', reviewController.getUserReviews);

export default router;
