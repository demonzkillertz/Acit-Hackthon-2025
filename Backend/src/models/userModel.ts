export interface User {
  id: number;
  username: string;
  password: string;
  role: 'user' | 'driver' | 'company';
}

// SQL for user table (for reference):
// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   username VARCHAR(255) UNIQUE NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   role VARCHAR(20) NOT NULL
// );
