import pool from './db';

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(20) NOT NULL,
      email VARCHAR(100),
      phone VARCHAR(20),
      profile_pic TEXT,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS companies (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS routes (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      polyline TEXT,
      stops JSONB
    );

    CREATE TABLE IF NOT EXISTS buses (
      id SERIAL PRIMARY KEY,
      number VARCHAR(50) NOT NULL,
      company_id INTEGER REFERENCES companies(id),
      driver_id INTEGER REFERENCES users(id),
      route_id INTEGER REFERENCES routes(id)
    );

    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      bus_id INTEGER REFERENCES buses(id),
      lat DOUBLE PRECISION NOT NULL,
      lng DOUBLE PRECISION NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      bus_id INTEGER REFERENCES buses(id),
      rating INTEGER NOT NULL,
      comment TEXT,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS favorites (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      bus_id INTEGER REFERENCES buses(id)
    );

    CREATE TABLE IF NOT EXISTS alerts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      bus_id INTEGER REFERENCES buses(id),
      type VARCHAR(50) NOT NULL,
      message TEXT,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS waitlists (
      id SERIAL PRIMARY KEY,
      bus_id INTEGER REFERENCES buses(id),
      user_id INTEGER REFERENCES users(id),
      station_id INTEGER,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}
