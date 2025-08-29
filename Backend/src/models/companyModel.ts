export async function createCompany(name: string) {
  const result = await pool.query('INSERT INTO companies (name) VALUES ($1) RETURNING *', [name]);
  return result.rows[0];
}

export async function updateCompany(companyId: number, name: string) {
  const result = await pool.query('UPDATE companies SET name = $1 WHERE id = $2 RETURNING *', [name, companyId]);
  return result.rows[0];
}

export async function deleteCompany(companyId: number) {
  await pool.query('DELETE FROM companies WHERE id = $1', [companyId]);
  return { success: true };
}

export async function createBus(number: string, companyId: number, driverId: number, routeId: number) {
  const result = await pool.query(
    'INSERT INTO buses (number, company_id, driver_id, route_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [number, companyId, driverId, routeId]
  );
  return result.rows[0];
}

export async function updateBus(busId: number, number: string, driverId: number, routeId: number) {
  const result = await pool.query(
    'UPDATE buses SET number = $1, driver_id = $2, route_id = $3 WHERE id = $4 RETURNING *',
    [number, driverId, routeId, busId]
  );
  return result.rows[0];
}

export async function deleteBus(busId: number) {
  await pool.query('DELETE FROM buses WHERE id = $1', [busId]);
  return { success: true };
}
import pool from '../config/db';

export async function getCompanyById(companyId: number) {
  const result = await pool.query('SELECT * FROM companies WHERE id = $1', [companyId]);
  return result.rows[0];
}

export async function getCompanyBuses(companyId: number) {
  const result = await pool.query(
    `SELECT buses.*, users.username as driver_name, routes.name as route_name
     FROM buses
     LEFT JOIN users ON buses.driver_id = users.id
     LEFT JOIN routes ON buses.route_id = routes.id
     WHERE buses.company_id = $1`,
    [companyId]
  );
  return result.rows;
}

export async function getBusDetails(busId: number) {
  const result = await pool.query(
    `SELECT buses.*, users.username as driver_name, routes.name as route_name, companies.name as company_name
     FROM buses
     LEFT JOIN users ON buses.driver_id = users.id
     LEFT JOIN routes ON buses.route_id = routes.id
     LEFT JOIN companies ON buses.company_id = companies.id
     WHERE buses.id = $1`,
    [busId]
  );
  return result.rows[0];
}

export async function getBusTimeGaps(companyId: number, routeId: number) {
  // Returns time difference between consecutive buses on a route for a company
  const result = await pool.query(
    `SELECT b1.id as bus1_id, b2.id as bus2_id, b1.number as bus1_number, b2.number as bus2_number,
            ABS(EXTRACT(EPOCH FROM (l2.timestamp - l1.timestamp))) as time_gap_seconds
     FROM buses b1
     JOIN buses b2 ON b1.route_id = b2.route_id AND b1.company_id = b2.company_id AND b1.id < b2.id
     JOIN locations l1 ON l1.bus_id = b1.id
     JOIN locations l2 ON l2.bus_id = b2.id
     WHERE b1.company_id = $1 AND b1.route_id = $2
     ORDER BY time_gap_seconds ASC`,
    [companyId, routeId]
  );
  return result.rows;
}
