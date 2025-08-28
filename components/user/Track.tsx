import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

// Custom Leaflet Map Component for Bus Tracking
function BusTrackingMap({ 
  latitude = 27.7103, 
  longitude = 85.322, 
  zoom = 14,
  style 
}: {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  style?: any;
}) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bus Route Tracker</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
            html, body { height: 100%; margin: 0; padding: 0; }
            #map { height: 100vh; width: 100vw; }
            .custom-icon { background: transparent !important; border: none !important; }
            .eta-popup {
                background: #ff6b35;
                color: white;
                padding: 8px 12px;
                border-radius: 8px;
                font-weight: bold;
                font-size: 14px;
                border: none;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            // Initialize map centered on Dhaka, Bangladesh
            var map = L.map('map').setView([${latitude}, ${longitude}], ${zoom});
            
            // Add Google Maps-like tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            // Custom icons
            var busIcon = L.divIcon({
                html: '<div style="background-color: #ff6b35; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4);"></div>',
                iconSize: [22, 22],
                className: 'custom-icon'
            });
            
            var stopIcon = L.divIcon({
                html: '<div style="background-color: #2196F3; width: 12px; height: 12px; border-radius: 2px; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>',
                iconSize: [16, 16],
                className: 'custom-icon'
            });
            
            var startIcon = L.divIcon({
                html: '<div style="background-color: #4CAF50; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">S</div>',
                iconSize: [26, 26],
                className: 'custom-icon'
            });
            
            var endIcon = L.divIcon({
                html: '<div style="background-color: #f44336; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold;">E</div>',
                iconSize: [26, 26],
                className: 'custom-icon'
            });
            
            // Define route points (Dhaka area)
var routePoints = [
    [27.7103, 85.3222], // Ratnapark (center KTM)
    [27.7135, 85.3155], // New Road
    [27.7172, 85.3240], // Durbar Marg
    [27.7195, 85.3300], // Thamel
    [27.7220, 85.3365], // Lazimpat
    [27.7270, 85.3420], // Baluwatar
    [27.7320, 85.3475], // Maharajgunj
    [27.7370, 85.3525], // Chakrapath
    [27.7440, 85.3550], // Basundhara
    [27.7485, 85.3610], // Gongabu Bus Park
];

            
            // Create main route polyline
            var mainRoute = L.polyline(routePoints, {
                color: '#2196F3',
                weight: 6,
                opacity: 0.8
            }).addTo(map);
            
            // Add bus stops along the route
var busStops = [
    { pos: [27.7103, 85.3222], name: 'Ratnapark' },       // Central KTM
    { pos: [27.7172, 85.3240], name: 'Durbar Marg' },     // Near King's Palace
    { pos: [27.7195, 85.3300], name: 'Thamel' },          // Tourist hub
    { pos: [27.7220, 85.3365], name: 'Lazimpat' },        // Embassy area
    { pos: [27.7270, 85.3420], name: 'Baluwatar' },       // Residential area
    { pos: [27.7320, 85.3475], name: 'Maharajgunj' },     // Near Teaching Hospital
    { pos: [27.7370, 85.3525], name: 'Chakrapath' },      // Ring Road
    { pos: [27.7440, 85.3550], name: 'Basundhara' },      // Commercial area
    { pos: [27.7485, 85.3610], name: 'Gongabu Bus Park' } // Main bus terminal
];

            
            busStops.forEach(function(stop, index) {
                if (index === 0) {
                    L.marker(stop.pos, {icon: startIcon}).addTo(map)
                        .bindPopup('<b>' + stop.name + '</b><br>Starting Point');
                } else if (index === busStops.length - 1) {
                    L.marker(stop.pos, {icon: endIcon}).addTo(map)
                        .bindPopup('<b>' + stop.name + '</b><br>Destination');
                } else {
                    L.marker(stop.pos, {icon: stopIcon}).addTo(map)
                        .bindPopup('<b>' + stop.name + '</b><br>Bus Stop');
                }
            });
            
            // Current bus position (moving along route)
            var currentBusPosition = [27.7103, 85.32225];
            var busMarker = L.marker(currentBusPosition, {icon: busIcon}).addTo(map)
                .bindPopup('<b>Bus #101</b><br>Route: Rayer Bazar to Town Hall<br>Speed: 25 km/h<br>Passengers: 28/40');
            
            // Simulate bus movement
            var currentIndex = 6;
            setInterval(function() {
                if (currentIndex < routePoints.length - 1) {
                    currentIndex += 0.1;
                    var nextPoint = routePoints[Math.floor(currentIndex)];
                    var progress = currentIndex - Math.floor(currentIndex);
                    
                    if (Math.floor(currentIndex) < routePoints.length - 1) {
                        var currentPoint = routePoints[Math.floor(currentIndex)];
                        var nextPoint = routePoints[Math.floor(currentIndex) + 1];
                        
                        var lat = currentPoint[0] + (nextPoint[0] - currentPoint[0]) * progress;
                        var lng = currentPoint[1] + (nextPoint[1] - currentPoint[1]) * progress;
                        
                        busMarker.setLatLng([lat, lng]);
                    }
                } else {
                    currentIndex = 0; // Reset to start
                }
            }, 2000);
            
            // Add ETA indicator
            var etaIcon = L.divIcon({
                html: '<div style="background-color: #ff6b35; color: white; padding: 6px 10px; border-radius: 6px; font-weight: bold; font-size: 12px; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); white-space: nowrap;">2 min<br>4.6 km</div>',
                iconSize: [100, 100],
                className: 'custom-icon'
            });
            
            L.marker([ 27.7103, 85.3222], {icon: etaIcon}).addTo(map);
            
            // Enable map interactions
            map.scrollWheelZoom.enable();
            map.doubleClickZoom.enable();
            map.touchZoom.enable();
            map.dragging.enable();
            map.boxZoom.enable();
            map.keyboard.enable();
            
            // Fit map to show the route
            map.fitBounds(mainRoute.getBounds(), {padding: [20, 20]});
        </script>
    </body>
    </html>
  `;

  return (
    <View style={[trackMapStyles.container, style]}>
      <WebView
        source={{ html: htmlContent }}
        style={trackMapStyles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}

const trackMapStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

// Add the onBack prop to the component interface
interface TrackBusScreenProps {
  onBack?: () => void;
}

export default function Track({ onBack }: TrackBusScreenProps) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update the handleBack function to use the onBack prop
  const handleBack = () => {
    console.log('Navigate back');
    if (onBack) {
      onBack(); // Call the onBack function passed from parent
    }
  };

  const handleMenu = () => {
    console.log('Open menu');
  };

  const handlePickup = () => {
    console.log('Pickup selected');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.time}>{currentTime}</Text>
        <View style={styles.statusIcons}>
          <Ionicons name="cellular" size={16} color="#fff" />
          <Ionicons name="wifi" size={16} color="#fff" style={{ marginLeft: 4 }} />
          <Ionicons name="battery-full" size={16} color="#fff" style={{ marginLeft: 4 }} />
        </View>
      </View>

      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMenu} style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Map Container */}
      <View style={styles.mapContainer}>
        <BusTrackingMap
          latitude={27.7195}
          longitude={85.3300}
          zoom={14}
          style={styles.map}
        />
      </View>

      {/* Route Info Overlay */}
      <View style={styles.routeInfoOverlay}>
        <View style={styles.routeCard}>
          <View style={styles.routeHeader}>
            <Text style={styles.routeTitle}>Bus Route Tracking</Text>
            <Text style={styles.routeSubtitle}>Rayer Bazar to Town Hall Market</Text>
          </View>
          
          <View style={styles.routeDetails}>
            <View style={styles.routeItem}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.routeText}>ETA: 2 minutes</Text>
            </View>
            <View style={styles.routeItem}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.routeText}>Distance: 4.6 km</Text>
            </View>
            <View style={styles.routeItem}>
              <Ionicons name="speedometer-outline" size={16} color="#666" />
              <Text style={styles.routeText}>Speed: 25 km/h</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bus Status Card */}
      <View style={styles.busStatusCard}>
        <View style={styles.busInfo}>
          <View style={styles.busHeader}>
            <View style={styles.busIconContainer}>
              <Ionicons name="bus" size={20} color="#fff" />
            </View>
            <View style={styles.busDetails}>
              <Text style={styles.busNumber}>Bus #101</Text>
              <Text style={styles.busRoute}>Rayer Bazar → Town Hall</Text>
            </View>
            <View style={styles.statusIndicator}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>On Route</Text>
            </View>
          </View>
          
          <View style={styles.busStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>28/40</Text>
              <Text style={styles.statLabel}>Passengers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>Next Stop</Text>
              <Text style={styles.statLabel}>Mohammadpur</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2 min</Text>
              <Text style={styles.statLabel}>Arrival</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Bottom Action Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.pickupButton} onPress={handlePickup}>
          <Text style={styles.pickupButtonText}>Pickup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Complete styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: '#000',
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#000',
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  backButton: {
    padding: 8,
  },
  menuButton: {
    padding: 8,
  },
  mapContainer: {
    flex: 1,
    marginTop: 0,
  },
  map: {
    flex: 1,
  },
  routeInfoOverlay: {
    position: 'absolute',
    top: 100,
    left: 16,
    right: 16,
    zIndex: 999,
  },
  routeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  routeHeader: {
    marginBottom: 12,
  },
  routeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  routeSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  busStatusCard: {
    position: 'absolute',
    bottom: 120,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 999,
  },
  busInfo: {
    width: '100%',
  },
  busHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  busIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff6b35',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  busDetails: {
    flex: 1,
  },
  busNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  busRoute: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  statusIndicator: {
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '600',
  },
  busStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 999,
  },
  pickupButton: {
    backgroundColor: '#FFA726',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  pickupButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
});