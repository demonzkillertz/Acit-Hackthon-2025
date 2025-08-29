-- Comprehensive data seeding for Bus Tracking System
-- This will populate all tables with realistic test data

-- Clear existing data
TRUNCATE TABLE waitlists, reviews, user_alerts, user_favorites, bus_locations, route_stops, routes, buses, companies, users RESTART IDENTITY CASCADE;

-- Insert specific users as requested
INSERT INTO users (username, email, password, role, phone, is_active) VALUES
('kriman', 'kriman@example.com', '$2a$10$JYP.HsP7CJ810izglj/C1ezC32NlWPI3FJ/UEtezXv.ZwRbyAdJyO', 'user', '+977-9841234567', true),
('siddhartha', 'siddhartha@example.com', '$2a$10$JYP.HsP7CJ810izglj/C1ezC32NlWPI3FJ/UEtezXv.ZwRbyAdJyO', 'company', '+977-9841234568', true),
('sabi', 'sabi@example.com', '$2a$10$JYP.HsP7CJ810izglj/C1ezC32NlWPI3FJ/UEtezXv.ZwRbyAdJyO', 'driver', '+977-9841234569', true);

-- Insert additional random users
INSERT INTO users (username, email, password, role, phone, is_active) VALUES
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
('rajesh_driver', 'rajesh@example.com', '$2a$10$JYP.HsP7CJ810izglj/C1ezC32NlWPI3FJ/UEtezXv.ZwRbyAdJyO', 'driver', '+977-9841234580', true);

-- Insert companies (siddhartha's company and others)
INSERT INTO companies (user_id, name, description, contact_email, contact_phone, address, website, established_year, fleet_size, rating, total_reviews, is_verified) VALUES
(2, 'Siddhartha Transport Services', 'Premium bus services connecting major cities across Nepal with comfort and safety as our priority.', 'siddhartha@example.com', '+977-9841234568', 'Kathmandu, Nepal', 'www.siddharthatransport.com', 2015, 25, 4.5, 120, true),
(10, 'Great Nepal Bus Service', 'Reliable and affordable transportation solutions for daily commuters and long-distance travelers.', 'bishal@greatnepalbus.com', '+977-9841234575', 'Pokhara, Nepal', 'www.greatnepalbus.com', 2010, 40, 4.2, 85, true),
(11, 'Golden Transport Company', 'Luxury bus services with modern amenities and professional drivers for a comfortable journey.', 'krishna@goldentransport.com', '+977-9841234576', 'Chitwan, Nepal', 'www.goldentransport.com', 2018, 15, 4.8, 65, true);

-- Insert additional company without user (for testing)
INSERT INTO companies (name, description, contact_email, contact_phone, address, website, established_year, fleet_size, rating, total_reviews, is_verified) VALUES
('Mountain Express', 'Specialized in hill station connectivity with experienced drivers and well-maintained vehicles.', 'info@mountainexpress.com', '+977-9841234590', 'Dharan, Nepal', 'www.mountainexpress.com', 2012, 20, 4.0, 95, false),
('Valley Riders', 'Urban transport solutions within Kathmandu valley with frequent schedules and affordable rates.', 'contact@valleyriders.com', '+977-9841234591', 'Lalitpur, Nepal', 'www.valleyriders.com', 2020, 30, 3.8, 110, true);

-- Insert buses for each company
INSERT INTO buses (company_id, driver_id, plate_number, model, capacity, amenities, status) VALUES
-- Siddhartha Transport buses
(1, 3, 'BA-1-CHA-1234', 'Tata Ultra AC', 45, '{"ac": true, "wifi": true, "charging_ports": true, "entertainment": true}', 'active'),
(1, 5, 'BA-1-CHA-1235', 'Ashok Leyland Viking', 52, '{"ac": false, "wifi": false, "charging_ports": true, "entertainment": false}', 'active'),
(1, 6, 'BA-1-CHA-1236', 'Mercedes-Benz Travego', 40, '{"ac": true, "wifi": true, "charging_ports": true, "entertainment": true, "reclining_seats": true}', 'active'),
(1, 12, 'BA-1-CHA-1237', 'Volvo B9R', 48, '{"ac": true, "wifi": true, "charging_ports": true, "entertainment": true, "gps": true}', 'maintenance'),

-- Great Nepal Bus Service buses
(2, 15, 'GAN-2-PA-5678', 'Tata Starbus', 50, '{"ac": true, "wifi": false, "charging_ports": true, "entertainment": false}', 'active'),
(2, NULL, 'GAN-2-PA-5679', 'Mahindra Tourister', 35, '{"ac": false, "wifi": false, "charging_ports": false, "entertainment": false}', 'active'),
(2, 15, 'GAN-2-PA-5680', 'Force Traveller', 26, '{"ac": true, "wifi": false, "charging_ports": true, "entertainment": false}', 'active'),

-- Golden Transport Company buses  
(3, NULL, 'NAR-3-GHA-9012', 'Scania Metrolink', 55, '{"ac": true, "wifi": true, "charging_ports": true, "entertainment": true, "luxury_seats": true}', 'active'),
(3, NULL, 'NAR-3-GHA-9013', 'MAN Lion''s Coach', 42, '{"ac": true, "wifi": true, "charging_ports": true, "entertainment": true, "reclining_seats": true}', 'active'),

-- Mountain Express buses
(4, NULL, 'SUN-4-KHA-3456', 'Eicher Starline', 38, '{"ac": false, "wifi": false, "charging_ports": true, "entertainment": false}', 'active'),
(4, NULL, 'SUN-4-KHA-3457', 'Ashok Leyland Lynx', 45, '{"ac": true, "wifi": false, "charging_ports": true, "entertainment": false}', 'active'),

-- Valley Riders buses
(5, NULL, 'BAG-5-PA-7890', 'Tata City Ride', 32, '{"ac": false, "wifi": false, "charging_ports": false, "entertainment": false}', 'active'),
(5, NULL, 'BAG-5-PA-7891', 'Mahindra Bolero Camper', 15, '{"ac": false, "wifi": false, "charging_ports": true, "entertainment": false}', 'active'),
(5, NULL, 'BAG-5-PA-7892', 'Force Trax Cruiser', 20, '{"ac": true, "wifi": false, "charging_ports": true, "entertainment": false}', 'retired');

-- Insert routes for each company
INSERT INTO routes (company_id, bus_id, route_name, start_location, end_location, distance_km, estimated_duration, base_fare, is_active) VALUES
-- Siddhartha Transport routes
(1, 1, 'Kathmandu to Pokhara Express', 'Kathmandu Bus Park', 'Pokhara Tourist Bus Park', 200.5, 360, 800.00, true),
(1, 2, 'Kathmandu to Chitwan Safari', 'New Bus Park, Kathmandu', 'Sauraha, Chitwan', 165.2, 300, 600.00, true),
(1, 3, 'Pokhara to Lumbini Heritage', 'Pokhara Bus Park', 'Lumbini Garden', 125.8, 240, 500.00, true),
(1, 4, 'Kathmandu Ring Road Circuit', 'Ratna Park', 'Ratna Park', 27.5, 90, 50.00, false),

-- Great Nepal Bus Service routes
(2, 5, 'Kathmandu to Dharan Direct', 'Kathmandu', 'Dharan Bus Park', 385.7, 480, 1200.00, true),
(2, 6, 'Pokhara to Butwal Connection', 'Pokhara', 'Butwal Bus Terminal', 98.3, 180, 400.00, true),
(2, 7, 'Local Pokhara City Tour', 'Pokhara Bus Park', 'Lakeside Pokhara', 12.5, 45, 100.00, true),

-- Golden Transport routes
(3, 8, 'Luxury Kathmandu to Janakpur', 'Kathmandu', 'Janakpur', 225.4, 420, 1500.00, true),
(3, 9, 'Premium Chitwan to Lumbini', 'Bharatpur, Chitwan', 'Lumbini', 87.6, 150, 700.00, true),

-- Mountain Express routes
(4, 10, 'Kathmandu to Ilam Tea Route', 'Kathmandu', 'Ilam', 445.2, 600, 1800.00, true),
(4, 11, 'Dharan to Taplejung Adventure', 'Dharan', 'Taplejung', 156.8, 360, 900.00, true),

-- Valley Riders routes
(5, 12, 'Kathmandu Valley Circuit', 'Ratna Park', 'Patan Durbar Square', 8.5, 30, 25.00, true),
(5, 13, 'Airport to Thamel Shuttle', 'Tribhuvan Airport', 'Thamel', 6.2, 25, 150.00, true),
(5, 14, 'Bhaktapur Heritage Route', 'New Bus Park', 'Bhaktapur Durbar Square', 13.8, 40, 75.00, false);

-- Insert route stops for major routes
INSERT INTO route_stops (route_id, stop_name, stop_order, latitude, longitude, estimated_arrival) VALUES
-- Kathmandu to Pokhara Express stops
(1, 'Kathmandu Bus Park', 1, 27.7172, 85.3240, 0),
(1, 'Thankot Checkpoint', 2, 27.6892, 85.2034, 30),
(1, 'Naubise Junction', 3, 27.6433, 85.1456, 45),
(1, 'Mugling', 4, 27.8567, 84.8234, 120),
(1, 'Dumre', 5, 27.9876, 84.4567, 180),
(1, 'Damauli', 6, 27.9234, 84.2890, 210),
(1, 'Pokhara Tourist Bus Park', 7, 28.2096, 83.9856, 360),

-- Kathmandu to Chitwan Safari stops
(2, 'New Bus Park, Kathmandu', 1, 27.7172, 85.3240, 0),
(2, 'Thankot', 2, 27.6892, 85.2034, 25),
(2, 'Hetauda', 3, 27.4267, 85.0456, 120),
(2, 'Bharatpur', 4, 27.6789, 84.4234, 240),
(2, 'Sauraha, Chitwan', 5, 27.5789, 84.5012, 300),

-- Kathmandu Valley Circuit stops
(12, 'Ratna Park', 1, 27.7172, 85.3240, 0),
(12, 'Jawalakhel', 2, 27.6789, 85.3156, 10),
(12, 'Lagankhel', 3, 27.6656, 85.3234, 15),
(12, 'Patan Durbar Square', 4, 27.6722, 85.3264, 30);

-- Insert bus locations (current positions)
INSERT INTO bus_locations (bus_id, latitude, longitude, speed, heading) VALUES
(1, 27.8567, 84.8234, 65.5, 285),  -- On Kathmandu-Pokhara route
(2, 27.6789, 84.4234, 55.2, 180),  -- In Chitwan
(3, 28.2096, 83.9856, 0.0, 0),     -- Parked in Pokhara
(4, 27.7172, 85.3240, 0.0, 0),     -- Parked in Kathmandu
(5, 26.8567, 87.2823, 48.7, 90),   -- On Dharan route
(6, 27.8234, 83.4567, 42.3, 270),  -- Near Butwal
(7, 28.2096, 83.9856, 25.1, 45),   -- Local Pokhara service
(8, 27.2456, 85.9234, 58.9, 120),  -- Towards Janakpur
(9, 27.5789, 84.5012, 0.0, 0),     -- Parked in Chitwan
(10, 27.1234, 87.8567, 35.6, 60),  -- Mountain route
(11, 26.8567, 87.2823, 0.0, 0),    -- Parked in Dharan
(12, 27.6789, 85.3156, 15.4, 180), -- Valley circuit
(13, 27.6962, 85.3591, 22.1, 315), -- Airport shuttle
(14, 27.7172, 85.3240, 0.0, 0);    -- Parked

-- Insert user favorites
INSERT INTO user_favorites (user_id, company_id, route_id) VALUES
(1, 1, 1),  -- kriman likes Siddhartha's Kathmandu-Pokhara route
(1, 2, 5),  -- kriman likes Great Nepal's Kathmandu-Dharan route
(7, 1, 2),  -- anjana likes Siddhartha's Chitwan route
(8, 3, 8),  -- prakash likes Golden Transport's Janakpur route
(9, 5, 12), -- maya likes Valley Riders circuit
(13, 1, 1), -- asha likes Siddhartha's express route
(14, 2, 6); -- binod likes Great Nepal's Pokhara-Butwal route

-- Insert user alerts
INSERT INTO user_alerts (user_id, bus_id, route_id, type, message, is_read, expires_at) VALUES
(1, 1, 1, 'delay', 'Your bus from Kathmandu to Pokhara is running 30 minutes late due to traffic.', false, NOW() + INTERVAL '6 hours'),
(1, 5, 5, 'arrival', 'Bus BA-1-CHA-1234 will arrive at Mugling in 15 minutes.', true, NOW() + INTERVAL '2 hours'),
(7, 2, 2, 'safety', 'Weather alert: Heavy rain expected on Kathmandu-Chitwan route. Drive safely.', false, NOW() + INTERVAL '12 hours'),
(8, 8, 8, 'general', 'New luxury amenities available on Golden Transport buses!', false, NOW() + INTERVAL '7 days'),
(9, 12, 12, 'arrival', 'Your Valley Circuit bus is approaching Jawalakhel stop.', true, NOW() + INTERVAL '1 hour'),
(13, 1, 1, 'delay', 'Traffic congestion at Thankot. Expect 20 minutes delay.', false, NOW() + INTERVAL '4 hours'),
(14, 6, 6, 'arrival', 'Bus GAN-2-PA-5679 arriving at Butwal terminal in 10 minutes.', false, NOW() + INTERVAL '2 hours');

-- Insert reviews
INSERT INTO reviews (company_id, user_id, bus_id, route_id, rating, comment) VALUES
(1, 1, 1, 1, 5, 'Excellent service! The AC bus was very comfortable and the driver was professional. Highly recommended for Kathmandu-Pokhara travel.'),
(1, 7, 2, 2, 4, 'Good experience overall. The bus was clean and reached on time. Could improve the entertainment system.'),
(1, 8, 3, 3, 5, 'Luxury bus with great amenities. The reclining seats made the journey very comfortable. Will definitely use again.'),
(2, 1, 5, 5, 4, 'Reliable service to Dharan. The journey was smooth and the staff was helpful. Good value for money.'),
(2, 9, 6, 6, 3, 'Average service. The bus was okay but could be cleaner. The route timing needs improvement.'),
(3, 8, 8, 8, 5, 'Premium service as promised! The luxury seats and onboard amenities were excellent. Worth the price.'),
(3, 13, 9, 9, 4, 'Great bus for Chitwan-Lumbini route. Professional service and comfortable journey.'),
(4, 14, 10, 10, 4, 'Good for mountain routes. Experienced driver and well-maintained bus. Scenic journey to Ilam.'),
(5, 9, 12, 12, 3, 'Convenient for valley travel but buses could be more modern. Frequent service is a plus.'),
(1, 14, 4, 4, 2, 'Bus broke down during the journey. Poor maintenance. Customer service needs improvement.'),
(2, 7, 7, 7, 5, 'Excellent local service in Pokhara. Clean buses and friendly staff. Great for city tours.'),
(3, 1, 8, 8, 5, 'Outstanding luxury experience! Every detail was perfect from booking to arrival.'),
(4, 8, 11, 11, 4, 'Adventure route was exciting. Good service for hill station connectivity.'),
(5, 13, 13, 13, 4, 'Reliable airport shuttle. Quick and convenient. Saved a lot of time and hassle.'),
(1, 9, 1, 1, 4, 'Regular user of this route. Generally good service but sometimes delayed during festivals.');

-- Insert waitlists
INSERT INTO waitlists (user_id, route_id, position, status) VALUES
(1, 1, 1, 'confirmed'),    -- kriman confirmed for Kathmandu-Pokhara
(7, 8, 2, 'waiting'),      -- anjana waiting for luxury Janakpur route
(8, 5, 1, 'confirmed'),    -- prakash confirmed for Dharan route
(9, 12, 3, 'waiting'),     -- maya waiting for valley circuit
(13, 3, 1, 'confirmed'),   -- asha confirmed for Pokhara-Lumbini
(14, 6, 2, 'waiting'),     -- binod waiting for Pokhara-Butwal
(1, 10, 4, 'waiting'),     -- kriman waiting for Ilam tea route
(8, 9, 1, 'confirmed');    -- prakash confirmed for Chitwan-Lumbini

-- Update company statistics based on inserted data
UPDATE companies SET 
    fleet_size = (SELECT COUNT(*) FROM buses WHERE company_id = companies.id),
    total_reviews = (SELECT COUNT(*) FROM reviews WHERE company_id = companies.id),
    rating = (SELECT ROUND(AVG(rating), 1) FROM reviews WHERE company_id = companies.id)
WHERE id IN (1, 2, 3, 4, 5);

-- Ensure all passwords are properly hashed for 'password123'
-- Note: The hash above is for 'password123' using bcrypt with salt rounds 10

SELECT 'Data seeding completed successfully!' as status;
