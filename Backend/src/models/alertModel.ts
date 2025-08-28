import pool from '../config/db';

export async function addAlert(userId: number, busId: number, type: string, message: string) {
  const result = await pool.query(
    'INSERT INTO alerts (user_id, bus_id, type, message) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, busId, type, message]
  );
  return result.rows[0];
}

export async function getBusAlerts(busId: number) {
  const result = await pool.query(
    'SELECT * FROM alerts WHERE bus_id = $1 ORDER BY timestamp DESC',
    [busId]
  );
  return result.rows;
}

export async function getUserAlerts(userId: number) {
  const result = await pool.query(
    'SELECT * FROM alerts WHERE user_id = $1 ORDER BY timestamp DESC',
    [userId]
  );
  return result.rows;
}
