import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

// Custom Leaflet Map Component for Routes View
function RoutesMapComponent({ 
  latitude = 23.8103, 
  longitude = 90.4125, 
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
        <title>Routes Map</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
            html, body { height: 100%; margin: 0; padding: 0; }
            #map { height: 100vh; width: 100vw; }
            .custom-icon { background: transparent !important; border: none !important; }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            // Initialize map
            var map = L.map('map').setView([${latitude}, ${longitude}], ${zoom});
            
            // Add OpenStreetMap tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            // Custom icons for routes view
            var routeStartIcon = L.divIcon({
                html: '<div style="background-color: #4CAF50; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4);"></div>',
                iconSize: [22, 22],
                className: 'custom-icon'
            });
            
            var routeEndIcon = L.divIcon({
                html: '<div style="background-color: #f44336; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4);"></div>',
                iconSize: [22, 22],
                className: 'custom-icon'
            });
            
            var stopIcon = L.divIcon({
                html: '<div style="background-color: #FF9800; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>',
                iconSize: [16, 16],
                className: 'custom-icon'
            });
            
            var currentBusIcon = L.divIcon({
                html: '<div style="background-color: #2196F3; width: 18px; height: 18px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4);"></div>',
                iconSize: [24, 24],
                className: 'custom-icon'
            });
            
            // Define route points (matching the Figma design)
            var route1Points = [
                [23.8103, 90.4125], // Feni Toll area
                [23.8120, 90.4140],
                [23.8135, 90.4155], // Vision & Value Overhead
                [23.8150, 90.4170], 
                [23.8165, 90.4185], // Linga Bhatiary Devi Temple
                [23.8180, 90.4200],
                [23.8195, 90.4215], // Korean Aesthetic area
                [23.8210, 90.4230],
                [23.8225, 90.4245], // Maharajganj
            ];
            
            // Create main route polyline (blue route)
            var mainRoute = L.polyline(route1Points, {
                color: '#2196F3',
                weight: 5,
                opacity: 0.8
            }).addTo(map);
            
            // Add route markers
            L.marker([23.8103, 90.4125], {icon: routeStartIcon}).addTo(map)
                .bindPopup('<b>FENI TOLL</b><br>Starting Point<br>Route begins here');
            
            L.marker([23.8225, 90.4245], {icon: routeEndIcon}).addTo(map)
                .bindPopup('<b>MAHARAJGANJ</b><br>মহারাজগঞ্জ<br>Final destination');
            
            // Add intermediate bus stops
            var busStops = [
                { pos: [23.8135, 90.4155], name: 'Vision & Value Overhead', subtitle: '(Fair & Ethical Recruiter)' },
                { pos: [23.8165, 90.4185], name: 'Linga Bhatiary', subtitle: 'Devi Temple' },
                { pos: [23.8195, 90.4215], name: 'Korean Aesthetic', subtitle: 'Me in mahasisganj<br>Skin care Hospital' },
            ];
            
            busStops.forEach(function(stop) {
                L.marker(stop.pos, {icon: stopIcon}).addTo(map)
                    .bindPopup('<b>' + stop.name + '</b><br>' + stop.subtitle + '<br>Bus Stop');
            });
            
            // Add moving bus on the route
            var currentBusPosition = [23.8180, 90.4200]; // Current position on route
            L.marker(currentBusPosition, {icon: currentBusIcon}).addTo(map)
                .bindPopup('<b>Current Bus</b><br>Bus #101<br>User: Kreeman08<br>En route to Maharajganj');
            
            // Add area labels
            L.marker([23.8225, 90.4250], {
                icon: L.divIcon({
                    html: '<div style="background: rgba(255,255,255,0.9); padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; color: #333; text-align: center;">MAHARAJGANJ<br>মহারাজগঞ্জ</div>',
                    className: 'custom-icon',
                    iconSize: [120, 35]
                })
            }).addTo(map);
            
            L.marker([23.8110, 90.4130], {
                icon: L.divIcon({
                    html: '<div style="background: rgba(255,255,255,0.9); padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; color: #333;">FENI TOLL</div>',
                    className: 'custom-icon',
                    iconSize: [80, 20]
                })
            }).addTo(map);
            
            // Add Google logo (bottom left)
            L.marker([23.8070, 90.4080], {
                icon: L.divIcon({
                    html: '<div style="background: rgba(255,255,255,0.9); padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; color: #4285f4;">Google</div>',
                    className: 'custom-icon',
                    iconSize: [60, 20]
                })
            }).addTo(map);
            
            // Add CCTV Camera notice (top right)
            L.marker([23.8250, 90.4320], {
                icon: L.divIcon({
                    html: '<div style="background: rgba(33, 150, 243, 0.9); color: white; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; text-align: center;">CCTV Camera<br>Service Normal</div>',
                    className: 'custom-icon',
                    iconSize: [80, 30]
                })
            }).addTo(map);
            
            // Enable all map interactions
            map.scrollWheelZoom.enable();
            map.doubleClickZoom.enable();
            map.touchZoom.enable();
            map.dragging.enable();
            map.boxZoom.enable();
            map.keyboard.enable();
            
            // Fit map to show the route with padding
            map.fitBounds(mainRoute.getBounds(), {padding: [30, 30]});
            
            // Add user info overlay
            L.marker([23.8070, 90.4300], {
                icon: L.divIcon({
                    html: '<div style="background: rgba(76, 175, 80, 0.9); color: white; padding: 6px 10px; border-radius: 6px; font-size: 10px; font-weight: bold; text-align: center;">User: Kreeman08<br>2025-08-28 17:20:52</div>',
                    className: 'custom-icon',
                    iconSize: [120, 30]
                })
            }).addTo(map);
        </script>
    </body>
    </html>
  `;

  return (
    <View style={[routesMapStyles.container, style]}>
      <WebView
        source={{ html: htmlContent }}
        style={routesMapStyles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}

const routesMapStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

// Add the onBack prop to the component interface
interface RoutesScreenProps {
  onBack?: () => void;
  activeTab?: string;
  onNavigate?: (tab: string) => void;
}

export default function Routes({ onBack, activeTab = 'routes', onNavigate }: RoutesScreenProps) {
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

  const handleBack = () => {
    console.log('Navigate back');
    if (onBack) {
      onBack();
    }
  };

  const handleMenu = () => {
    console.log('Open menu');
  };

  const handleNavigation = (tab: string) => {
    if (onNavigate) {
      onNavigate(tab);
    }
  };

  const handleFixRoute = () => {
    console.log('Fix route pressed - User: Kreeman08');
  };

  const handleStartGPS = () => {
    console.log('Start GPS pressed - User: Kreeman08 - Time: 2025-08-28 17:20:52');
  };

  const handleViewPassengerTraffic = () => {
    console.log('View passenger traffic pressed - User: Kreeman08');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.time}>9:41</Text>
        <View style={styles.statusIcons}>
          <Ionicons name="cellular" size={16} color="#000" />
          <Ionicons name="wifi" size={16} color="#000" style={{ marginLeft: 4 }} />
          <Ionicons name="battery-full" size={16} color="#000" style={{ marginLeft: 4 }} />
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="bus" size={20} color="#333" />
        </View>
        <Text style={styles.title}>Guruji</Text>
        <View style={styles.profileContainer}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileInitial}>K</Text>
          </View>
        </View>
      </View>

      {/* Menu Icon */}
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={handleMenu}>
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
      </View>


      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#888" />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="#888"
          />
          <MaterialIcons name="keyboard-voice" size={18} color="#888" />
        </View>
      </View>

      {/* Route Selection */}
      <View style={styles.routeSelection}>
        <View style={styles.routeDropdown}>
          <Text style={styles.routeText}>Starting route</Text>
          <Ionicons name="chevron-down" size={16} color="#333" />
        </View>
        <Ionicons name="arrow-forward" size={20} color="#333" style={styles.arrowIcon} />
        <View style={styles.routeDropdown}>
          <Text style={styles.routeText}>Destination route</Text>
          <Ionicons name="chevron-down" size={16} color="#333" />
        </View>
      </View>

      {/* Map Container - Full integrated Leaflet map */}
      <View style={styles.mapContainer}>
        <RoutesMapComponent
          latitude={23.8103}
          longitude={90.4125}
          zoom={13}
          style={styles.map}
        />
      </View>

      {/* Bottom Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={handleFixRoute}>
          <Text style={styles.actionButtonText}>Fix route</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleStartGPS}>
          <Text style={styles.actionButtonText}>Start GPS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleViewPassengerTraffic}>
          <Text style={styles.actionButtonText}>View Passenger traffic</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: '#fff',
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logoContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  profileContainer: {
    width: 32,
    height: 32,
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8D6E63',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  menuContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  navText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '400',
    paddingVertical: 4,
  },
  activeNavText: {
    color: '#333',
    fontWeight: '600',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 15,
    color: '#333',
  },
  routeSelection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA726',
    marginHorizontal: 16,
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 16,
  },
  routeDropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  routeText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  arrowIcon: {
    marginHorizontal: 8,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  actionButton: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  bottomNavItem: {
    padding: 8,
  },
});