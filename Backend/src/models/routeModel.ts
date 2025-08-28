import pool from '../config/db';

export async function createRoute(name: string, polyline: string, stops: any) {
  const result = await pool.query(
    'INSERT INTO routes (name, polyline, stops) VALUES ($1, $2, $3) RETURNING *',
    [name, polyline, JSON.stringify(stops)]
  );
  return result.rows[0];
}

export async function updateRoute(routeId: number, name: string, polyline: string, stops: any) {
  const result = await pool.query(
    'UPDATE routes SET name = $1, polyline = $2, stops = $3 WHERE id = $4 RETURNING *',
    [name, polyline, JSON.stringify(stops), routeId]
  );
  return result.rows[0];
}

export async function deleteRoute(routeId: number) {
  await pool.query('DELETE FROM routes WHERE id = $1', [routeId]);
  return { success: true };
}

export async function getRouteById(routeId: number) {
  const result = await pool.query('SELECT * FROM routes WHERE id = $1', [routeId]);
  return result.rows[0];
}

export async function getAllRoutes() {
  const result = await pool.query('SELECT * FROM routes');
  return result.rows;
}
