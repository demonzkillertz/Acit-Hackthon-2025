import { Router } from 'express';
import pool from '../config/db';
const router = Router();

// GET /api/test/db - test database connection
router.get('/db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
