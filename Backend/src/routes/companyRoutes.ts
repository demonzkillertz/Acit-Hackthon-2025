import { Router } from 'express';
const router = Router();

// GET /api/company/buses
router.get('/buses', (req, res) => {
  res.send('All company buses');
});

// GET /api/company/bus/:busId
router.get('/bus/:busId', (req, res) => {
  res.send('Bus, driver, conductor info');
});

// GET /api/company/routes/gaps
router.get('/routes/gaps', (req, res) => {
  res.send('Bus time gaps');
});

export default router;
