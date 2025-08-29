import pool from '../config/db';
import dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  try {
    console.log('Starting database seeding...');

    // Clear existing data
    await pool.query('TRUNCATE TABLE waitlists, reviews, user_alerts, user_favorites, bus_locations, route_stops, routes, buses, companies, users RESTART IDENTITY CASCADE');
    console.log('Existing data cleared.');

    // Insert specific users as requested
    const userInsertQuery = `
      INSERT INTO users (username, email, password, role, phone, is_active) VALUES
      ('kriman', 'kriman@example.com', '$2a$10$JYP.HsP7CJ810izglj/C1ezC32NlWPI3FJ/UEtezXv.ZwRbyAdJyO', 'user', '+977-9841234567', true),
      ('siddhartha', 'siddhartha@example.com', '$2a$10$JYP.HsP7CJ810izglj/C1ezC32NlWPI3FJ/UEtezXv.ZwRbyAdJyO', 'company', '+977-9841234568', true),
      ('sabi', 'sabi@example.com', '$2a$10$JYP.HsP7CJ810izglj/C1ezC32NlWPI3FJ/UEtezXv.ZwRbyAdJyO', 'driver', '+977-9841234569', true),
      ('admin', 'admin@bustracking.com', '$2a$10$JYP.HsP7CJ810izglj/C1ezC32NlWPI3FJ/UEtezXv.ZwRbyAdJyO', 'admin', '+977-9841234500', true),
      ('ramesh_driver', 'ramesh@example.com', '$2a$10$JYP.HsP7CJ810izglj/C1ezC32NlWPI3FJ/UEtezXv.ZwRbyAdJyO', 'driver', '+977-9841234570', true),
      ('surya_driver', 'surya@example.com', '$2a$10$JYP.HsP7CJ810izglj/C1ezC32NlWPI3FJ/UEtezXv.ZwRbyAdJyO', 'driver', '+977-9841234571', true),
      ('anjana_user', 'anjana@example.com', '$2a$10$JYP.HsP7CJ810izglj/C1ezC32NlWPI3FJ/UEtezXv.ZwRbyAdJyO', 'user', '+977-9841234572', true),
      ('prakash_user', 'prakash@example.com', '$2a$10$JYP.HsP7CJ810izglj/C1ezC32NlWPI3FJ/UEtezXv.ZwRbyAdJyO', 'user', '+977-9841234573', true),
      ('maya_user', 'maya@example.com', '$2a$10$JYP.HsP7CJ810izglj/C1ezC32NlWPI3FJ/UEtezXv.ZwRbyAdJyO', 'user', '+977-9841234574', true),
      ('bishal_company', 'bishal@greatnepalbus.com', '$2a$10$JYP.HsP7CJ810izglj/C1ezC32NlWPI3FJ/UEtezXv.ZwRbyAdJyO', 'company', '+977-9841234575', true),
      ('krishna_company', 'krishna@goldentransport.com', '$2a$10$JYP.HsP7CJ810izglj/C1ezC32NlWPI3FJ/UEtezXv.ZwRbyAdJyO', 'company', '+977-9841234576', true),
      ('deepak_driver', 'deepak@example.com', '$2a$10$JYP.HsP7CJ810izglj/C1ezC32NlWPI3FJ/UEtezXv.ZwRbyAdJyO', 'driver', '+977-9841234577', true),
      ('asha_user', 'asha@example.com', '$2a$10$JYP.HsP7CJ810izglj/C1ezC32NlWPI3FJ/UEtezXv.ZwRbyAdJyO', 'user', '+977-9841234578', true),
      ('binod_user', 'binod@example.com', '$2a$10$JYP.HsP7CJ810izglj/C1ezC32NlWPI3FJ/UEtezXv.ZwRbyAdJyO', 'user', '+977-9841234579', true),
      ('rajesh_driver', 'rajesh@example.com', '$2a$10$JYP.HsP7CJ810izglj/C1ezC32NlWPI3FJ/UEtezXv.ZwRbyAdJyO', 'driver', '+977-9841234580', true)
      RETURNING id;
    `;
    
    await pool.query(userInsertQuery);
    console.log('Users inserted successfully.');

    // Insert companies
    const companyInsertQuery = `
      INSERT INTO companies (user_id, name, description, contact_email, contact_phone, address, website, established_year, fleet_size, rating, total_reviews, is_verified) VALUES
      (2, 'Siddhartha Transport Services', 'Premium bus services connecting major cities across Nepal with comfort and safety as our priority.', 'siddhartha@example.com', '+977-9841234568', 'Kathmandu, Nepal', 'www.siddharthatransport.com', 2015, 25, 4.5, 120, true),
      (10, 'Great Nepal Bus Service', 'Reliable and affordable transportation solutions for daily commuters and long-distance travelers.', 'bishal@greatnepalbus.com', '+977-9841234575', 'Pokhara, Nepal', 'www.greatnepalbus.com', 2010, 40, 4.2, 85, true),
      (11, 'Golden Transport Company', 'Luxury bus services with modern amenities and professional drivers for a comfortable journey.', 'krishna@goldentransport.com', '+977-9841234576', 'Chitwan, Nepal', 'www.goldentransport.com', 2018, 15, 4.8, 65, true);
    `;
    
    await pool.query(companyInsertQuery);
    console.log('Companies inserted successfully.');

    // Insert buses
    const busInsertQuery = `
      INSERT INTO buses (company_id, driver_id, plate_number, model, capacity, amenities, status) VALUES
      (1, 3, 'BA-1-CHA-1234', 'Tata Ultra AC', 45, '{"ac": true, "wifi": true, "charging_ports": true, "entertainment": true}', 'active'),
      (1, 5, 'BA-1-CHA-1235', 'Ashok Leyland Viking', 52, '{"ac": false, "wifi": false, "charging_ports": true, "entertainment": false}', 'active'),
      (1, 6, 'BA-1-CHA-1236', 'Mercedes-Benz Travego', 40, '{"ac": true, "wifi": true, "charging_ports": true, "entertainment": true, "reclining_seats": true}', 'active'),
      (1, 12, 'BA-1-CHA-1237', 'Volvo B9R', 48, '{"ac": true, "wifi": true, "charging_ports": true, "entertainment": true, "gps": true}', 'maintenance'),
      (2, 15, 'GAN-2-PA-5678', 'Tata Starbus', 50, '{"ac": true, "wifi": false, "charging_ports": true, "entertainment": false}', 'active'),
      (2, NULL, 'GAN-2-PA-5679', 'Mahindra Tourister', 35, '{"ac": false, "wifi": false, "charging_ports": false, "entertainment": false}', 'active'),
      (3, NULL, 'NAR-3-GHA-9012', 'Scania Metrolink', 55, '{"ac": true, "wifi": true, "charging_ports": true, "entertainment": true, "luxury_seats": true}', 'active'),
      (3, NULL, 'NAR-3-GHA-9013', 'MAN Lions Coach', 42, '{"ac": true, "wifi": true, "charging_ports": true, "entertainment": true, "reclining_seats": true}', 'active');
    `;
    
    await pool.query(busInsertQuery);
    console.log('Buses inserted successfully.');

    // Insert routes
    const routeInsertQuery = `
      INSERT INTO routes (company_id, bus_id, route_name, start_location, end_location, distance_km, estimated_duration, base_fare, is_active) VALUES
      (1, 1, 'Kathmandu to Pokhara Express', 'Kathmandu Bus Park', 'Pokhara Tourist Bus Park', 200.5, 360, 800.00, true),
      (1, 2, 'Kathmandu to Chitwan Safari', 'New Bus Park, Kathmandu', 'Sauraha, Chitwan', 165.2, 300, 600.00, true),
      (1, 3, 'Pokhara to Lumbini Heritage', 'Pokhara Bus Park', 'Lumbini Garden', 125.8, 240, 500.00, true),
      (2, 5, 'Kathmandu to Dharan Direct', 'Kathmandu', 'Dharan Bus Park', 385.7, 480, 1200.00, true),
      (2, 6, 'Pokhara to Butwal Connection', 'Pokhara', 'Butwal Bus Terminal', 98.3, 180, 400.00, true),
      (3, 7, 'Luxury Kathmandu to Janakpur', 'Kathmandu', 'Janakpur', 225.4, 420, 1500.00, true),
      (3, 8, 'Premium Chitwan to Lumbini', 'Bharatpur, Chitwan', 'Lumbini', 87.6, 150, 700.00, true);
    `;
    
    await pool.query(routeInsertQuery);
    console.log('Routes inserted successfully.');

    // Insert bus locations
    const locationInsertQuery = `
      INSERT INTO bus_locations (bus_id, latitude, longitude, speed, heading) VALUES
      (1, 27.8567, 84.8234, 65.5, 285),
      (2, 27.6789, 84.4234, 55.2, 180),
      (3, 28.2096, 83.9856, 0.0, 0),
      (4, 27.7172, 85.3240, 0.0, 0),
      (5, 26.8567, 87.2823, 48.7, 90),
      (6, 27.8234, 83.4567, 42.3, 270),
      (7, 27.2456, 85.9234, 58.9, 120),
      (8, 27.5789, 84.5012, 0.0, 0);
    `;
    
    await pool.query(locationInsertQuery);
    console.log('Bus locations inserted successfully.');

    // Insert reviews
    const reviewInsertQuery = `
      INSERT INTO reviews (company_id, user_id, bus_id, route_id, rating, comment) VALUES
      (1, 1, 1, 1, 5, 'Excellent service! The AC bus was very comfortable and the driver was professional. Highly recommended for Kathmandu-Pokhara travel.'),
      (1, 7, 2, 2, 4, 'Good experience overall. The bus was clean and reached on time. Could improve the entertainment system.'),
      (1, 8, 3, 3, 5, 'Luxury bus with great amenities. The reclining seats made the journey very comfortable. Will definitely use again.'),
      (2, 1, 5, 4, 4, 'Reliable service to Dharan. The journey was smooth and the staff was helpful. Good value for money.'),
      (2, 9, 6, 5, 3, 'Average service. The bus was okay but could be cleaner. The route timing needs improvement.'),
      (3, 8, 7, 6, 5, 'Premium service as promised! The luxury seats and onboard amenities were excellent. Worth the price.'),
      (3, 13, 8, 7, 4, 'Great bus for Chitwan-Lumbini route. Professional service and comfortable journey.');
    `;
    
    await pool.query(reviewInsertQuery);
    console.log('Reviews inserted successfully.');

    // Insert user favorites
    const favoritesInsertQuery = `
      INSERT INTO user_favorites (user_id, company_id, route_id) VALUES
      (1, 1, 1),
      (1, 2, 4),
      (7, 1, 2),
      (8, 3, 6),
      (9, 2, 5),
      (13, 1, 1),
      (14, 2, 5);
    `;
    
    await pool.query(favoritesInsertQuery);
    console.log('User favorites inserted successfully.');

    // Insert alerts
    const alertsInsertQuery = `
      INSERT INTO user_alerts (user_id, bus_id, route_id, type, message, is_read, expires_at) VALUES
      (1, 1, 1, 'delay', 'Your bus from Kathmandu to Pokhara is running 30 minutes late due to traffic.', false, NOW() + INTERVAL '6 hours'),
      (1, 5, 4, 'arrival', 'Bus BA-1-CHA-1234 will arrive at Mugling in 15 minutes.', true, NOW() + INTERVAL '2 hours'),
      (7, 2, 2, 'safety', 'Weather alert: Heavy rain expected on Kathmandu-Chitwan route. Drive safely.', false, NOW() + INTERVAL '12 hours'),
      (8, 7, 6, 'general', 'New luxury amenities available on Golden Transport buses!', false, NOW() + INTERVAL '7 days'),
      (9, 6, 5, 'arrival', 'Your Pokhara-Butwal bus is approaching the terminal.', true, NOW() + INTERVAL '1 hour');
    `;
    
    await pool.query(alertsInsertQuery);
    console.log('User alerts inserted successfully.');

    console.log('Database seeding completed successfully!');
    console.log('Test users created:');
    console.log('- kriman (user role) - password: password123');
    console.log('- siddhartha (company role) - password: password123');  
    console.log('- sabi (driver role) - password: password123');
    console.log('- admin (admin role) - password: password123');
    console.log('Plus 11 additional users with various roles.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
