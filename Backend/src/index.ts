import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// TODO: Import and use routes here
// import userRoutes from './routes/userRoutes';
// app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Bus Tracking & Passenger Safety Backend is running.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
