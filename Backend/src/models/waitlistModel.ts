import pool from '../config/db';

export async function addToWaitlist(busId: number, userId: number, stationId: number) {
  const result = await pool.query(
    'INSERT INTO waitlists (bus_id, user_id, station_id) VALUES ($1, $2, $3) RETURNING *',
    [busId, userId, stationId]
  );
  return result.rows[0];
}

export async function removeFromWaitlist(busId: number, userId: number, stationId: number) {
  await pool.query(
    'DELETE FROM waitlists WHERE bus_id = $1 AND user_id = $2 AND station_id = $3',
    [busId, userId, stationId]
  );
  return { success: true };
}

export async function getBusWaitlist(busId: number) {
  const result = await pool.query(
    'SELECT * FROM waitlists WHERE bus_id = $1 ORDER BY timestamp',
    [busId]
  );
  return result.rows;
}
