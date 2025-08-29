import { Router } from 'express';
import * as favoriteController from '../controllers/favoriteController';

const router = Router();

router.post('/', favoriteController.addFavorite);
router.delete('/', favoriteController.removeFavorite);
router.get('/user/:userId', favoriteController.getUserFavorites);

export default router;
