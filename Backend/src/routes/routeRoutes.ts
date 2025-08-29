import { Router } from 'express';
import * as routeController from '../controllers/routeController';

const router = Router();

router.post('/', routeController.createRoute);
router.put('/:id', routeController.updateRoute);
router.delete('/:id', routeController.deleteRoute);
router.get('/:id', routeController.getRouteById);
router.get('/', routeController.getAllRoutes);

export default router;
