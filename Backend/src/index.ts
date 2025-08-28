

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { initDb } from './config/initDb';

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerDocument = YAML.load(__dirname + '/swagger/swagger.yaml');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import driverRoutes from './routes/driverRoutes';
import companyRoutes from './routes/companyRoutes';
import routeRoutes from './routes/routeRoutes';
import locationRoutes from './routes/locationRoutes';
import reviewRoutes from './routes/reviewRoutes';
import favoriteRoutes from './routes/favoriteRoutes';
import alertRoutes from './routes/alertRoutes';
import waitlistRoutes from './routes/waitlistRoutes';
import testRoutes from './routes/testRoutes';


app.use('/api/test', testRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/driver', driverRoutes);
app.use('/api/company', companyRoutes);

app.use('/api/routes', routeRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/waitlists', waitlistRoutes);

app.get('/', (req, res) => {
  res.send('Bus Tracking & Passenger Safety Backend is running.');
});

const PORT = process.env.PORT || 5000;
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
