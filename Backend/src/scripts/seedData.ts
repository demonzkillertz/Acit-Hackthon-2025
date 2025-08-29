import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'bus',
  password: process.env.DB_PASSWORD || 'admin',
  port: parseInt(process.env.DB_PORT || '5432'),
});

async function seedData() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Clear existing data
    await client.query('DELETE FROM route_stops');
    await client.query('DELETE FROM bus_locations');
    await client.query('DELETE FROM user_favorites');
    await client.query('DELETE FROM user_alerts');
    await client.query('DELETE FROM waitlists');
    await client.query('DELETE FROM reviews');
    await client.query('DELETE FROM routes');
    await client.query('DELETE FROM buses');
    await client.query('DELETE FROM companies');
    await client.query('DELETE FROM users WHERE role != \'admin\'');
    
    console.log('Cleared existing data');
    
    // Create some sample user accounts first
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = [
      { username: 'john_doe', email: 'john@example.com', role: 'user' },
      { username: 'jane_smith', email: 'jane@example.com', role: 'user' },
      { username: 'mike_wilson', email: 'mike@example.com', role: 'user' },
      { username: 'demo_company', email: 'company@example.com', role: 'company' }
    ];
    
    const userIds = [];
    for (const user of users) {
      const result = await client.query(
        `INSERT INTO users (username, email, password, role, created_at, updated_at)
         VALUES ($1, $2, $3, $4, NOW(), NOW())
         RETURNING id`,
        [user.username, user.email, hashedPassword, user.role]
      );
      userIds.push(result.rows[0].id);
      console.log(`Created user: ${user.username} with ID: ${result.rows[0].id}`);
    }
    
    // Insert sample companies
    const companies = [
      {
        name: 'Metro Express',
        description: 'Fast and reliable intercity bus service connecting major cities across the region.',
        contact_email: 'contact@metroexpress.com',
        contact_phone: '+1-555-0101',
        address: '123 Transport Hub, Metro City, MC 12345',
        logo_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&h=200&fit=crop&crop=center',
        website: 'https://metroexpress.com',
        established_year: 2010,
        fleet_size: 150,
        rating: 4.5
      },
      {
        name: 'City Connect',
        description: 'Premium urban transportation with modern amenities and eco-friendly buses.',
        contact_email: 'info@cityconnect.com',
        contact_phone: '+1-555-0202',
        address: '456 Urban Plaza, Downtown District, DD 54321',
        logo_url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=200&h=200&fit=crop&crop=center',
        website: 'https://cityconnect.com',
        established_year: 2015,
        fleet_size: 85,
        rating: 4.3
      },
      {
        name: 'Highway Heroes',
        description: 'Long-distance travel specialists with luxury coaches and sleeper services.',
        contact_email: 'support@highwayheroes.com',
        contact_phone: '+1-555-0303',
        address: '789 Highway Junction, Travel Town, TT 98765',
        logo_url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop&crop=center',
        website: 'https://highwayheroes.com',
        established_year: 2008,
        fleet_size: 200,
        rating: 4.7
      },
      {
        name: 'Green Transit',
        description: 'Environmentally conscious transportation using electric and hybrid vehicles.',
        contact_email: 'hello@greentransit.com',
        contact_phone: '+1-555-0404',
        address: '321 Eco Park, Green Valley, GV 13579',
        logo_url: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=200&h=200&fit=crop&crop=center',
        website: 'https://greentransit.com',
        established_year: 2018,
        fleet_size: 60,
        rating: 4.6
      },
      {
        name: 'Royal Coaches',
        description: 'Premium luxury bus service with executive amenities and VIP treatment.',
        contact_email: 'reservations@royalcoaches.com',
        contact_phone: '+1-555-0505',
        address: '654 Luxury Lane, Prestige Plaza, PP 24680',
        logo_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop&crop=center',
        website: 'https://royalcoaches.com',
        established_year: 2005,
        fleet_size: 120,
        rating: 4.8
      }
    ];
    
    for (const company of companies) {
      const result = await client.query(
        `INSERT INTO companies (name, description, contact_email, contact_phone, address, logo_url, website, established_year, fleet_size, rating, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
         RETURNING id`,
        [company.name, company.description, company.contact_email, company.contact_phone, 
         company.address, company.logo_url, company.website, company.established_year, 
         company.fleet_size, company.rating]
      );
      
      const companyId = result.rows[0].id;
      console.log(`Inserted company: ${company.name} with ID: ${companyId}`);
      
      // Insert sample buses for each company
      const busTypes = ['Standard', 'Deluxe', 'AC', 'Sleeper', 'Executive'];
      const busCount = Math.floor(Math.random() * 8) + 3; // 3-10 buses per company
      
      for (let i = 0; i < busCount; i++) {
        const plateNumber = `${company.name.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000) + 1000}`;
        const busType = busTypes[Math.floor(Math.random() * busTypes.length)];
        const capacity = busType === 'Sleeper' ? 36 : busType === 'Executive' ? 28 : 45;
        
        const busResult = await client.query(
          `INSERT INTO buses (company_id, plate_number, model, capacity, amenities, status, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
           RETURNING id`,
          [companyId, plateNumber, `${busType} Coach`, capacity, 
           JSON.stringify(['WiFi', 'AC', 'GPS Tracking', 'Emergency Kit']), 'active']
        );
        
        const busId = busResult.rows[0].id;
        
        // Insert sample routes for each bus
        const routes = [
          { name: 'City Center - Airport', distance: 25.5, duration: 45, fare: 12.50 },
          { name: 'Downtown - University', distance: 15.2, duration: 30, fare: 8.00 },
          { name: 'Mall - Business District', distance: 18.7, duration: 35, fare: 10.00 },
          { name: 'Station - Hospital', distance: 12.3, duration: 25, fare: 7.50 },
          { name: 'Airport - Hotel Zone', distance: 22.1, duration: 40, fare: 11.00 }
        ];
        
        if (i < 3) { // Only add routes for first 3 buses per company
          const route = routes[i % routes.length];
          const routeResult = await client.query(
            `INSERT INTO routes (company_id, bus_id, route_name, start_location, end_location, distance_km, estimated_duration, base_fare, is_active, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
             RETURNING id`,
            [companyId, busId, route.name, route.name.split(' - ')[0], route.name.split(' - ')[1], 
             route.distance, route.duration, route.fare, true]
          );
          
          const routeId = routeResult.rows[0].id;
          
          // Add some route stops
          const stops = [
            route.name.split(' - ')[0],
            `${route.name.split(' - ')[0]} Junction`,
            'Central Plaza',
            `${route.name.split(' - ')[1]} Terminal`,
            route.name.split(' - ')[1]
          ];
          
          for (let j = 0; j < stops.length; j++) {
            await client.query(
              `INSERT INTO route_stops (route_id, stop_name, stop_order, latitude, longitude, estimated_arrival, created_at, updated_at)
               VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())`,
              [routeId, stops[j], j + 1, 
               40.7128 + (Math.random() - 0.5) * 0.1, // Random coordinates around NYC
               -74.0060 + (Math.random() - 0.5) * 0.1,
               j * 10] // 10 minutes between stops
            );
          }
        }
        
        // Add current location for active buses
        if (Math.random() > 0.3) { // 70% of buses are currently active
          await client.query(
            `INSERT INTO bus_locations (bus_id, latitude, longitude, speed, heading, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
            [busId, 
             40.7128 + (Math.random() - 0.5) * 0.1,
             -74.0060 + (Math.random() - 0.5) * 0.1,
             Math.floor(Math.random() * 60) + 20, // 20-80 km/h
             Math.floor(Math.random() * 360)] // 0-359 degrees
          );
        }
      }
      
      // Add some sample reviews for each company
      const reviewTexts = [
        'Excellent service! The buses are clean and punctual.',
        'Good experience overall. The staff was helpful and friendly.',
        'Comfortable seats and smooth ride. Highly recommended!',
        'Great value for money. Will definitely use again.',
        'Professional service with modern amenities.',
        'Reliable transportation with good safety standards.',
        'Pleasant journey with courteous drivers.',
        'Well-maintained buses and reasonable fares.'
      ];
      
      const reviewCount = Math.floor(Math.random() * 5) + 3; // 3-7 reviews per company
      for (let i = 0; i < reviewCount; i++) {
        const rating = Math.floor(Math.random() * 3) + 3; // 3-5 stars
        const reviewText = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
        const randomUserIndex = Math.floor(Math.random() * userIds.length);
        
        await client.query(
          `INSERT INTO reviews (company_id, user_id, rating, comment, created_at, updated_at)
           VALUES ($1, $2, $3, $4, NOW(), NOW())`,
          [companyId, userIds[randomUserIndex], rating, reviewText]
        );
      }
    }
    
    await client.query('COMMIT');
    console.log('Sample data inserted successfully!');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error inserting sample data:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Run the seed function if called directly
if (require.main === module) {
  seedData()
    .then(() => {
      console.log('Seed data completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed data failed:', error);
      process.exit(1);
    });
}

export default seedData;
