import { Router } from 'express';
const router = Router();

// POST /api/driver/track
router.post('/track', (req, res) => {
  res.send('Driver tracking started/stopped');
});

// POST /api/driver/route
router.post('/route', (req, res) => {
  res.send('Route confirmed/fixed');
});

// GET /api/driver/passengers
router.get('/passengers', (req, res) => {
  res.send('List of waiting passengers');
});

export default router;
