import pool from '../config/db';

export async function addLocation(busId: number, lat: number, lng: number) {
  const result = await pool.query(
    'INSERT INTO locations (bus_id, lat, lng) VALUES ($1, $2, $3) RETURNING *',
    [busId, lat, lng]
  );
  return result.rows[0];
}

export async function getLatestLocation(busId: number) {
  const result = await pool.query(
    'SELECT * FROM locations WHERE bus_id = $1 ORDER BY timestamp DESC LIMIT 1',
    [busId]
  );
  return result.rows[0];
}

export async function getBusLocations(busId: number, limit = 50) {
  const result = await pool.query(
    'SELECT * FROM locations WHERE bus_id = $1 ORDER BY timestamp DESC LIMIT $2',
    [busId, limit]
  );
  return result.rows;
}
