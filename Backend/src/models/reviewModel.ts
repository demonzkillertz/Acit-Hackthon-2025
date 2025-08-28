import pool from '../config/db';

export async function addReview(userId: number, busId: number, rating: number, comment: string) {
  const result = await pool.query(
    'INSERT INTO reviews (user_id, bus_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
    [userId, busId, rating, comment]
  );
  return result.rows[0];
}

export async function getBusReviews(busId: number) {
  const result = await pool.query(
    'SELECT * FROM reviews WHERE bus_id = $1 ORDER BY timestamp DESC',
    [busId]
  );
  return result.rows;
}

export async function getUserReviews(userId: number) {
  const result = await pool.query(
    'SELECT * FROM reviews WHERE user_id = $1 ORDER BY timestamp DESC',
    [userId]
  );
  return result.rows;
}
