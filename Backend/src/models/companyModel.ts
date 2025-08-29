import pool from '../config/db';

export async function getAllCompanies() {
  const result = await pool.query(`
    SELECT c.*, 
           COUNT(b.id) as total_buses,
           COUNT(CASE WHEN bl.id IS NOT NULL THEN 1 END) as active_buses,
           AVG(r.rating) as avg_rating,
           COUNT(r.id) as review_count
    FROM companies c
    LEFT JOIN buses b ON c.id = b.company_id
    LEFT JOIN bus_locations bl ON b.id = bl.bus_id
    LEFT JOIN reviews r ON c.id = r.company_id
    GROUP BY c.id
    ORDER BY c.name
  `);
  return result.rows;
}

export async function getCompanyById(companyId: number) {
  const result = await pool.query('SELECT * FROM companies WHERE id = $1', [companyId]);
  return result.rows[0];
}

export async function getCompanyBuses(companyId: number) {
  const result = await pool.query(
    `SELECT buses.*, users.username as driver_name, routes.route_name, routes.start_location, routes.end_location,
            bl.latitude, bl.longitude, bl.speed
     FROM buses
     LEFT JOIN users ON buses.driver_id = users.id
     LEFT JOIN routes ON buses.id = routes.bus_id
     LEFT JOIN bus_locations bl ON buses.id = bl.bus_id
     WHERE buses.company_id = $1
     ORDER BY buses.plate_number`,
    [companyId]
  );
  return result.rows;
}

export async function getBusDetails(busId: number) {
  const result = await pool.query(
    `SELECT buses.*, users.username as driver_name, routes.route_name, routes.start_location, routes.end_location,
            companies.name as company_name, bl.latitude, bl.longitude, bl.speed, bl.heading
     FROM buses
     LEFT JOIN users ON buses.driver_id = users.id
     LEFT JOIN routes ON buses.id = routes.bus_id
     LEFT JOIN companies ON buses.company_id = companies.id
     LEFT JOIN bus_locations bl ON buses.id = bl.bus_id
     WHERE buses.id = $1`,
    [busId]
  );
  return result.rows[0];
}

export async function getBusTimeGaps(companyId: number, routeId: number) {
  // This would contain logic to calculate time gaps between buses on the same route
  // For now, return dummy data based on our bus locations
  return {
    averageGap: 15,
    gaps: [
      { busId: 1, gap: 12 },
      { busId: 2, gap: 18 },
      { busId: 3, gap: 15 }
    ]
  };
}

export async function createCompany(name: string, description?: string) {
  const result = await pool.query(
    'INSERT INTO companies (name, description, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *', 
    [name, description || '']
  );
  return result.rows[0];
}

export async function updateCompany(companyId: number, data: { name?: string; description?: string }) {
  const { name, description } = data;
  const result = await pool.query(
    'UPDATE companies SET name = COALESCE($1, name), description = COALESCE($2, description), updated_at = NOW() WHERE id = $3 RETURNING *', 
    [name, description, companyId]
  );
  return result.rows[0];
}

export async function deleteCompany(companyId: number) {
  await pool.query('DELETE FROM companies WHERE id = $1', [companyId]);
  return { success: true };
}

export async function createBus(plate_number: string, companyId: number, model: string, capacity: number, driverId?: number) {
  const result = await pool.query(
    `INSERT INTO buses (plate_number, company_id, model, capacity, driver_id, amenities, created_at, updated_at) 
     VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING *`,
    [plate_number, companyId, model, capacity, driverId || null, JSON.stringify(['WiFi', 'AC', 'GPS Tracking'])]
  );
  return result.rows[0];
}

export async function updateBus(busId: number, data: { plate_number?: string; model?: string; capacity?: number; driver_id?: number }) {
  const { plate_number, model, capacity, driver_id } = data;
  const result = await pool.query(
    `UPDATE buses SET 
     plate_number = COALESCE($1, plate_number), 
     model = COALESCE($2, model), 
     capacity = COALESCE($3, capacity), 
     driver_id = COALESCE($4, driver_id),
     updated_at = NOW()
     WHERE id = $5 RETURNING *`,
    [plate_number, model, capacity, driver_id, busId]
  );
  return result.rows[0];
}

export async function deleteBus(busId: number) {
  await pool.query('DELETE FROM buses WHERE id = $1', [busId]);
  return { success: true };
}
