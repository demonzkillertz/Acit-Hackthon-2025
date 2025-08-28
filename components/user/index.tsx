import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import TrackBusScreen from '../user/Track';
import Routes from './Routes';
// import Book from './Book';
import Search from './Search';
import Location from '../user/Location';

// Custom Leaflet Map Component
function LeafletMapComponent({ 
  latitude = 27.7103, 
  longitude = 85.3222, 
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
        <title>Bus Tracker Map</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
            html, body { height: 100%; margin: 0; padding: 0; }
            #map { height: 100vh; width: 100vw; }
            .custom-bus-icon { background: transparent !important; border: none !important; }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            // Initialize map
            var map = L.map('map').setView([${latitude}, ${longitude}], ${zoom});
            
            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            // Custom bus icon for active buses
            var activeBusIcon = L.divIcon({
                html: '<div style="background-color: #4CAF50; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
                iconSize: [16, 16],
                className: 'custom-bus-icon'
            });
            
            // Custom bus icon for arriving buses
            var arrivingBusIcon = L.divIcon({
                html: '<div style="background-color: #FF9800; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
                iconSize: [16, 16],
                className: 'custom-bus-icon'
            });
            
            // Custom bus icon for delayed buses
            var delayedBusIcon = L.divIcon({
                html: '<div style="background-color: #F44336; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
                iconSize: [16, 16],
                className: 'custom-bus-icon'
            });
            
            // Add bus markers with different statuses
            var bus1 = L.marker([${latitude}, ${longitude}], {icon: activeBusIcon}).addTo(map)
                .bindPopup('<b>Bus #101</b><br>Route: Central Station<br>Status: Active<br>ETA: 5 mins<br>User: Kreeman08<br>Time: 18:43:53 UTC');
            
            var bus2 = L.marker([${latitude + 0.003}, ${longitude - 0.002}], {icon: arrivingBusIcon}).addTo(map)
                .bindPopup('<b>Bus #102</b><br>Route: City Mall<br>Status: Arriving Soon<br>ETA: 2 mins<br>Updated: 18:43:53');
            
            var bus3 = L.marker([${latitude + 0.002}, ${longitude + 0.001}], {icon: delayedBusIcon}).addTo(map)
                .bindPopup('<b>Bus #103</b><br>Route: Airport<br>Status: Delayed<br>ETA: 15 mins<br>Updated: 18:43:53');
            
            var bus4 = L.marker([${latitude - 0.001}, ${longitude + 0.003}], {icon: activeBusIcon}).addTo(map)
                .bindPopup('<b>Bus #104</b><br>Route: University<br>Status: Active<br>ETA: 8 mins<br>Updated: 18:43:53');
            
            // Add route polylines
            var route1Points = [
                [${latitude}, ${longitude}],
                [${latitude + 0.001}, ${longitude - 0.001}],
                [${latitude + 0.002}, ${longitude + 0.001}],
                [${latitude + 0.003}, ${longitude - 0.002}]
            ];
            
            var route2Points = [
                [${latitude - 0.001}, ${longitude + 0.003}],
                [${latitude}, ${longitude + 0.002}],
                [${latitude + 0.001}, ${longitude + 0.001}],
                [${latitude + 0.002}, ${longitude}]
            ];
            
            var polyline1 = L.polyline(route1Points, {
                color: '#3388ff',
                weight: 3,
                opacity: 0.7,
                dashArray: '5, 10'
            }).addTo(map);
            
            var polyline2 = L.polyline(route2Points, {
                color: '#ff6b35',
                weight: 3,
                opacity: 0.7,
                dashArray: '5, 10'
            }).addTo(map);
            
            // Add bus stops
            var stopIcon = L.divIcon({
                html: '<div style="background-color: #2196F3; width: 8px; height: 8px; border-radius: 50%; border: 2px solid white;"></div>',
                iconSize: [12, 12],
                className: 'custom-bus-icon'
            });
            
            L.marker([${latitude + 0.0015}, ${longitude - 0.0005}], {icon: stopIcon}).addTo(map)
                .bindPopup('<b>Bus Stop</b><br>Central Plaza<br>Last updated: 18:43:53');
            
            L.marker([${latitude + 0.0025}, ${longitude + 0.0015}], {icon: stopIcon}).addTo(map)
                .bindPopup('<b>Bus Stop</b><br>Main Street<br>Last updated: 18:43:53');
            
            // Disable interactions for card view
            map.scrollWheelZoom.disable();
            map.doubleClickZoom.disable();
            map.touchZoom.disable();
            map.dragging.disable();
            map.boxZoom.disable();
            map.keyboard.disable();
            
            // Fit bounds to show all markers
            var group = new L.featureGroup([bus1, bus2, bus3, bus4]);
            map.fitBounds(group.getBounds().pad(0.1));
        </script>
    </body>
    </html>
  `;

  return (
    <View style={[mapStyles.container, style]}>
      <WebView
        source={{ html: htmlContent }}
        style={mapStyles.webview}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}

// Profile Map Component - Shows user's location and recent trips
function ProfileMapComponent({ 
  latitude = 27.7103, 
  longitude = 85.3222, 
  zoom = 12,
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
        <title>User Profile Map</title>
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
            
            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            // Custom user location icon
            var userIcon = L.divIcon({
                html: '<div style="background-color: #4CAF50; width: 20px; height: 20px; border-radius: 50%; border: 4px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;"><div style="width: 6px; height: 6px; background-color: white; border-radius: 50%;"></div></div>',
                iconSize: [28, 28],
                className: 'custom-icon'
            });
            
            // Recent trip icons
            var tripStartIcon = L.divIcon({
                html: '<div style="background-color: #2196F3; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
                iconSize: [18, 18],
                className: 'custom-icon'
            });
            
            var tripEndIcon = L.divIcon({
                html: '<div style="background-color: #FF5722; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
                iconSize: [18, 18],
                className: 'custom-icon'
            });
            
            var frequentStopIcon = L.divIcon({
                html: '<div style="background-color: #FF9800; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 1px 3px rgba(0,0,0,0.3);"></div>',
                iconSize: [16, 16],
                className: 'custom-icon'
            });
            
            // Add user's current location
            L.marker([${latitude}, ${longitude}], {icon: userIcon}).addTo(map)
                .bindPopup('<b>Kreeman08</b><br>Current Location<br>Last seen: 18:43:53 UTC<br>Status: Active');
            
            // Add recent trip history
            var recentTrips = [
                { start: [${latitude - 0.01}, ${longitude - 0.01}], end: [${latitude + 0.008}, ${longitude + 0.005}], date: '2025-08-27' },
                { start: [${latitude + 0.005}, ${longitude - 0.008}], end: [${latitude - 0.005}, ${longitude + 0.01}], date: '2025-08-26' },
                { start: [${latitude - 0.008}, ${longitude + 0.003}], end: [${latitude + 0.01}, ${longitude - 0.002}], date: '2025-08-25' }
            ];
            
            recentTrips.forEach(function(trip, index) {
                // Add start and end markers
                L.marker(trip.start, {icon: tripStartIcon}).addTo(map)
                    .bindPopup('<b>Trip Start</b><br>Date: ' + trip.date + '<br>Departure point<br>User: Kreeman08');
                
                L.marker(trip.end, {icon: tripEndIcon}).addTo(map)
                    .bindPopup('<b>Trip End</b><br>Date: ' + trip.date + '<br>Destination<br>User: Kreeman08');
                
                // Add route line
                L.polyline([trip.start, trip.end], {
                    color: index === 0 ? '#4CAF50' : '#9E9E9E',
                    weight: index === 0 ? 3 : 2,
                    opacity: index === 0 ? 0.8 : 0.5,
                    dashArray: index === 0 ? null : '5, 5'
                }).addTo(map);
            });
            
            // Add frequently visited stops
            var frequentStops = [
                { pos: [${latitude + 0.003}, ${longitude + 0.002}], name: 'Work Area', visits: 15 },
                { pos: [${latitude - 0.004}, ${longitude - 0.003}], name: 'Shopping District', visits: 8 },
                { pos: [${latitude + 0.002}, ${longitude - 0.005}], name: 'University Campus', visits: 12 }
            ];
            
            frequentStops.forEach(function(stop) {
                L.marker(stop.pos, {icon: frequentStopIcon}).addTo(map)
                    .bindPopup('<b>' + stop.name + '</b><br>Frequent Stop<br>Visits: ' + stop.visits + ' times<br>User: Kreeman08');
            });
            
            // Add home location
            var homeIcon = L.divIcon({
                html: '<div style="background-color: #E91E63; width: 18px; height: 18px; border-radius: 4px; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: bold;">H</div>',
                iconSize: [24, 24],
                className: 'custom-icon'
            });
            
            L.marker([${latitude - 0.006}, ${longitude + 0.004}], {icon: homeIcon}).addTo(map)
                .bindPopup('<b>Home</b><br>Kreeman08\\'s Home<br>Most frequent destination<br>Updated: 18:43:53');
            
            // Add user stats overlay
            L.marker([${latitude + 0.008}, ${longitude + 0.008}], {
                icon: L.divIcon({
                    html: '<div style="background: rgba(255,255,255,0.95); padding: 8px 12px; border-radius: 8px; font-size: 11px; font-weight: bold; color: #333; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">User: Kreeman08<br>47 Total Trips<br>Last Active: 18:43:53<br>Favorite Route: Downtown</div>',
                    className: 'custom-icon',
                    iconSize: [140, 60]
                })
            }).addTo(map);
            
            // Enable map interactions
            map.scrollWheelZoom.enable();
            map.doubleClickZoom.enable();
            map.touchZoom.enable();
            map.dragging.enable();
            map.boxZoom.enable();
            map.keyboard.enable();
            
            // Fit map to show user's activity area
            var bounds = L.latLngBounds([
                [${latitude - 0.012}, ${longitude - 0.012}],
                [${latitude + 0.012}, ${longitude + 0.012}]
            ]);
            map.fitBounds(bounds, {padding: [20, 20]});
        </script>
    </body>
    </html>
  `;

  return (
    <View style={[mapStyles.container, style]}>
      <WebView
        source={{ html: htmlContent }}
        style={mapStyles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}

const mapStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

// Home Screen Component
function HomeScreenContent({ onNavigate }: { onNavigate: (screen: string) => void }) {
  // Get current time for display
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const handleSearch = () => {
    console.log('Search pressed - User: Kreeman08 - Time: 2025-08-28 18:43:53');
    onNavigate('search');
  };

  const handleSearchInputFocus = () => {
    console.log('Search input focused - User: Kreeman08 - Time: 2025-08-28 18:43:53');
    onNavigate('search');
  };

  const handleTrackBus = () => {
    console.log('Track bus pressed - User: Kreeman08 - Time: 2025-08-28 18:43:53');
    onNavigate('trackBus');
  };

  const handleProfilePress = () => {
    console.log('Profile pressed - User: Kreeman08 - Time: 2025-08-28 18:43:53');
    onNavigate('profile');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.time}>{getCurrentTime()}</Text>
        <View style={styles.statusIcons}>
          <Ionicons name="cellular" size={16} color="#000" />
          <Ionicons name="wifi" size={16} color="#000" style={{ marginLeft: 4 }} />
          <Ionicons name="battery-full" size={16} color="#000" style={{ marginLeft: 4 }} />
        </View>
      </View>
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="bus" size={20} color="#333" />
          </View>
          <Text style={styles.title}>Guruji</Text>
          <TouchableOpacity style={styles.profileContainer} onPress={handleProfilePress}>
            <View style={styles.profilePlaceholder}>
              <Text style={styles.profileInitial}>K</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Menu Icon */}
        <View style={styles.menuContainer}>
          <TouchableOpacity>
            <Ionicons name="menu" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Navigation */}
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => onNavigate('home')}>
            <Text style={[styles.navItem, styles.activeNavItem]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNavigate('trackBus')}>
            <Text style={styles.navItem}>Track Bus</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNavigate('routes')}>
            <Text style={styles.navItem}>Routes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNavigate('book')}>
            <Text style={styles.navItem}>Book</Text>
          </TouchableOpacity>
        </View>

        {/* Search Section */}
        <Text style={styles.whereText}>Where are you going?</Text>
        <View style={styles.searchRow}>
          <TouchableOpacity style={styles.searchBox} onPress={handleSearchInputFocus}>
            <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
            <Text style={styles.searchPlaceholder}>Search destinations, routes...</Text>
            <TouchableOpacity>
              <MaterialIcons name="keyboard-voice" size={20} color="#888" style={styles.voiceIcon} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Text style={styles.searchBtnText}>search</Text>
          </TouchableOpacity>
        </View>

        {/* Bus Status & Map */}
        <View style={styles.busCard}>
          <View style={styles.busStatusContainer}>
            <View style={styles.busStatusRow}>
              <View style={[styles.statusDot, styles.statusDotActive]} />
              <Text style={styles.statusText}>Active Bus</Text>
            </View>
            <View style={styles.busStatusRow}>
              <View style={[styles.statusDot, styles.statusDotArriving]} />
              <Text style={styles.statusText}>Arriving soon</Text>
            </View>
            <View style={styles.busStatusRow}>
              <View style={[styles.statusDot, styles.statusDotDelayed]} />
              <Text style={styles.statusText}>Delayed</Text>
            </View>
            <TouchableOpacity style={styles.trackBtn} onPress={handleTrackBus}>
              <Text style={styles.trackBtnText}>Track bus</Text>
            </TouchableOpacity>
          </View>
          
          {/* Leaflet Map Container */}
          <View style={styles.mapContainer}>
            <LeafletMapComponent
              latitude={27.7103}
              longitude={85.3222}
              zoom={14}
              style={styles.leafletMap}
            />
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Quick Stats</Text>
          <View style={styles.statsRow}>
            <TouchableOpacity style={styles.statsItem}>
              <Text style={styles.statsNumber}>120</Text>
              <Text style={styles.statsLabel}>Total Buses{'\n'}Today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statsItem}>
              <Text style={styles.statsNumber}>24</Text>
              <Text style={styles.statsLabel}>Active{'\n'}Routes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statsItem}>
              <Text style={styles.statsNumber}>95%</Text>
              <Text style={styles.statsLabel}>On-time{'\n'}%</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statsItem}>
              <Text style={styles.statsNumber}>1250</Text>
              <Text style={styles.statsLabel}>Passengers{'\n'}Booked</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.activityTitle}>Recent Activity</Text>
          <View style={styles.activityItem}>
            <Ionicons name="bus" size={16} color="#4CAF50" />
            <Text style={styles.activityText}>Bus #101 arrived at Central Station</Text>
            <Text style={styles.activityTime}>2 mins ago</Text>
          </View>
          <View style={styles.activityItem}>
            <Ionicons name="time" size={16} color="#FF9800" />
            <Text style={styles.activityText}>Bus #102 delayed by 5 minutes</Text>
            <Text style={styles.activityTime}>5 mins ago</Text>
          </View>
        </View>

        {/* User Info Section */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoTitle}>Session Information</Text>
          <View style={styles.userInfoRow}>
            <Text style={styles.userInfoLabel}>Current User:</Text>
            <Text style={styles.userInfoValue}>Kreeman08</Text>
          </View>
          <View style={styles.userInfoRow}>
            <Text style={styles.userInfoLabel}>Current Date:</Text>
            <Text style={styles.userInfoValue}>2025-08-28</Text>
          </View>
          <View style={styles.userInfoRow}>
            <Text style={styles.userInfoLabel}>Current Time:</Text>
            <Text style={styles.userInfoValue}>18:43:53 UTC</Text>
          </View>
          <View style={styles.userInfoRow}>
            <Text style={styles.userInfoLabel}>Session Status:</Text>
            <Text style={styles.userInfoValue}>Active</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.bottomNavItem} onPress={() => onNavigate('home')}>
          <Ionicons name="home" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem} onPress={() => onNavigate('search')}>
          <Ionicons name="search" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem} onPress={() => onNavigate('location')}>
          <Ionicons name="location" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem} onPress={() => onNavigate('profile')}>
          <Ionicons name="person" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Main Screen Component with Navigation
export default function HomeScreen() {
  // Add state to manage which screen to show
  const [currentScreen, setCurrentScreen] = useState('home');

  // Navigation handler
  const handleNavigation = (section: string) => {
    console.log(`Navigate to ${section} - User: Kreeman08 - Time: 2025-08-28 18:43:53`);
    setCurrentScreen(section);
  };

  // Back navigation handler for screens
  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  // Render the appropriate screen based on currentScreen state
  const renderScreen = () => {
    switch (currentScreen) {
      case 'trackBus':
        return <TrackBusScreen onBack={handleBackToHome} />;
      case 'routes':
        return (
          <Routes 
            onBack={handleBackToHome} 
            activeTab={currentScreen}
            onNavigate={handleNavigation}
          />
        );
      // case 'book':
      //   return (
      //     <Book 
      //       onBack={handleBackToHome} 
      //       activeTab={currentScreen}
      //       onNavigate={handleNavigation}
      //     />
      //   );
      case 'search':
        return (
          <Search 
            onBack={handleBackToHome} 
            activeTab={currentScreen}
            onNavigate={handleNavigation}
          />
        );
      case 'location':
        return (
          <Location 
            onBack={handleBackToHome} 
            activeTab={currentScreen}
            onNavigate={handleNavigation}
          />
        );
      case 'profile':
        return (
          <View style={styles.profileScreen}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            
            {/* Profile Header */}
            <View style={styles.profileHeaderContainer}>
              <TouchableOpacity style={styles.profileBackButton} onPress={() => handleNavigation('home')}>
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.profileScreenTitle}>Profile</Text>
              <View style={styles.profileHeaderSpacer} />
            </View>

            <ScrollView style={styles.profileScrollContainer} showsVerticalScrollIndicator={false}>
              {/* Profile Info */}
              <View style={styles.profileHeader}>
                <View style={styles.profileAvatar}>
                  <Text style={styles.profileAvatarText}>K</Text>
                </View>
                <Text style={styles.profileUsername}>Kreeman08</Text>
                <Text style={styles.profileStatus}>Active User</Text>
              </View>

              {/* Profile Map */}
              <View style={styles.profileMapSection}>
                <Text style={styles.profileMapTitle}>Your Activity Map</Text>
                <View style={styles.profileMapContainer}>
                  <ProfileMapComponent
                    latitude={27.7103}
                    longitude={85.3222}
                    zoom={12}
                    style={styles.profileMap}
                  />
                </View>
              </View>
              
              {/* Profile Details */}
              <View style={styles.profileInfo}>
                <View style={styles.profileInfoItem}>
                  <Ionicons name="person-outline" size={20} color="#666" />
                  <View style={styles.profileInfoText}>
                    <Text style={styles.profileInfoLabel}>Username</Text>
                    <Text style={styles.profileInfoValue}>Kreeman08</Text>
                  </View>
                </View>
                
                <View style={styles.profileInfoItem}>
                  <Ionicons name="calendar-outline" size={20} color="#666" />
                  <View style={styles.profileInfoText}>
                    <Text style={styles.profileInfoLabel}>Date</Text>
                    <Text style={styles.profileInfoValue}>2025-08-28</Text>
                  </View>
                </View>
                
                <View style={styles.profileInfoItem}>
                  <Ionicons name="time-outline" size={20} color="#666" />
                  <View style={styles.profileInfoText}>
                    <Text style={styles.profileInfoLabel}>Last Active</Text>
                    <Text style={styles.profileInfoValue}>18:43:53 UTC</Text>
                  </View>
                </View>
                
                <View style={styles.profileInfoItem}>
                  <Ionicons name="location-outline" size={20} color="#666" />
                  <View style={styles.profileInfoText}>
                    <Text style={styles.profileInfoLabel}>Timezone</Text>
                    <Text style={styles.profileInfoValue}>UTC+0</Text>
                  </View>
                </View>
                
                <View style={styles.profileInfoItem}>
                  <Ionicons name="bus-outline" size={20} color="#666" />
                  <View style={styles.profileInfoText}>
                    <Text style={styles.profileInfoLabel}>Total Trips</Text>
                    <Text style={styles.profileInfoValue}>47 trips</Text>
                  </View>
                </View>

                <View style={styles.profileInfoItem}>
                  <Ionicons name="trophy-outline" size={20} color="#666" />
                  <View style={styles.profileInfoText}>
                    <Text style={styles.profileInfoLabel}>Favorite Route</Text>
                    <Text style={styles.profileInfoValue}>Downtown Express</Text>
                  </View>
                </View>
              </View>

              {/* Trip Statistics */}
              <View style={styles.tripStatsSection}>
                <Text style={styles.tripStatsTitle}>Trip Statistics</Text>
                <View style={styles.tripStatsRow}>
                  <View style={styles.tripStatItem}>
                    <Text style={styles.tripStatNumber}>47</Text>
                    <Text style={styles.tripStatLabel}>Total Trips</Text>
                  </View>
                  <View style={styles.tripStatItem}>
                    <Text style={styles.tripStatNumber}>3</Text>
                    <Text style={styles.tripStatLabel}>This Week</Text>
                  </View>
                  <View style={styles.tripStatItem}>
                    <Text style={styles.tripStatNumber}>15</Text>
                    <Text style={styles.tripStatLabel}>Frequent Stops</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        );
      case 'home':
      default:
        return <HomeScreenContent onNavigate={handleNavigation} />;
    }
  };

  return <View style={styles.appContainer}>{renderScreen()}</View>;
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileScreen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileBackButton: {
    padding: 8,
  },
  profileScreenTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  profileHeaderSpacer: {
    width: 40,
  },
  profileScrollContainer: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#8D6E63',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  profileAvatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileUsername: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileStatus: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  profileMapSection: {
    backgroundColor: '#fff',
    marginBottom: 16,
    paddingTop: 16,
  },
  profileMapTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  profileMapContainer: {
    height: 300,
  },
  profileMap: {
    flex: 1,
  },
  profileInfo: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileInfoText: {
    marginLeft: 16,
    flex: 1,
  },
  profileInfoLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 2,
  },
  profileInfoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  tripStatsSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tripStatsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  tripStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tripStatItem: {
    alignItems: 'center',
  },
  tripStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  tripStatLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  userInfoContainer: {
    backgroundColor: '#f8f9fa',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
    borderRadius: 12,
    padding: 16,
  },
  userInfoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  userInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  userInfoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  userInfoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
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
  scrollContainer: {
    flex: 1,
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
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  profileContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  profilePlaceholder: {
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
    paddingVertical: 8,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  navItem: {
    fontSize: 15,
    color: '#666',
    fontWeight: '400',
    paddingVertical: 4,
  },
  activeNavItem: {
    color: '#333',
    fontWeight: '600',
  },
  whereText: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 12,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    flex: 1,
    marginRight: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 10,
    color: '#888',
  },
  voiceIcon: {
    marginLeft: 8,
  },
  searchBtn: {
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  searchBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  busCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    margin: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  busStatusContainer: {
    flex: 1,
  },
  busStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusDotActive: {
    backgroundColor: '#4CAF50',
  },
  statusDotArriving: {
    backgroundColor: '#FF9800',
  },
  statusDotDelayed: {
    backgroundColor: '#F44336',
  },
  statusText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '400',
  },
  trackBtn: {
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  trackBtnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  mapContainer: {
    width: 180,
    height: 140,
    marginLeft: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#e0e0e0',
  },
  leafletMap: {
    width: '100%',
    height: '100%',
  },
  statsSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    lineHeight: 14,
  },
  activitySection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
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