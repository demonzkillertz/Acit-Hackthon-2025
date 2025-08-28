import pool from '../config/db';

export async function addFavorite(userId: number, busId: number) {
  const result = await pool.query(
    'INSERT INTO favorites (user_id, bus_id) VALUES ($1, $2) RETURNING *',
    [userId, busId]
  );
  return result.rows[0];
}

export async function removeFavorite(userId: number, busId: number) {
  await pool.query(
    'DELETE FROM favorites WHERE user_id = $1 AND bus_id = $2',
    [userId, busId]
  );
  return { success: true };
}

export async function getUserFavorites(userId: number) {
  const result = await pool.query(
    'SELECT * FROM favorites WHERE user_id = $1',
    [userId]
  );
  return result.rows;
}
