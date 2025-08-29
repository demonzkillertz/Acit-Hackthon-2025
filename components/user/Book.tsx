import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// Add the onBack prop to the component interface
interface BookScreenProps {
  onBack?: () => void;
  activeTab?: string;
  onNavigate?: (tab: string) => void;
}

export default function Book({ onBack, activeTab = 'book', onNavigate }: BookScreenProps) {
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
    console.log('Navigate back - User: Kreeman08 - Time: 2025-08-28 17:41:04');
    if (onBack) {
      onBack();
    }
  };

  const handleMenu = () => {
    console.log('Open menu - User: Kreeman08 - Time: 2025-08-28 17:41:04');
  };

  const handleNavigation = (tab: string) => {
    console.log(`Navigate to ${tab} - User: Kreeman08 - Time: 2025-08-28 17:41:04`);
    if (onNavigate) {
      onNavigate(tab);
    }
  };

  const handleLocationSwap = () => {
    console.log('Swap locations pressed - User: Kreeman08 - Time: 2025-08-28 17:41:04');
  };

  const handleMoreOptions = () => {
    console.log('More options pressed - User: Kreeman08 - Time: 2025-08-28 17:41:04');
  };

  const handleChangeBus = () => {
    console.log('Change Bus pressed - User: Kreeman08 - Time: 2025-08-28 17:41:04');
  };

  const handleBookTickets = () => {
    console.log('Book Tickets pressed - User: Kreeman08 - Route: Nexus Mall Koramangala to Cubbon Park - Time: 2025-08-28 17:41:04');
    // Here you would typically navigate to payment or confirmation screen
    alert('Booking Tickets for Kreeman08\nRoute: Nexus Mall Koramangala → Cubbon Park\nBus: 362C\nTime: 2025-08-28 17:41:04');
  };

  const handleBookPass = () => {
    console.log('Book Pass pressed - User: Kreeman08 - Route: Nexus Mall Koramangala to Cubbon Park - Time: 2025-08-28 17:41:04');
    // Here you would typically navigate to pass selection screen
    alert('Booking Pass for Kreeman08\nRoute: Nexus Mall Koramangala → Cubbon Park\nTime: 2025-08-28 17:41:04');
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



      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Location Selection */}
        <View style={styles.locationContainer}>
          {/* From Location */}
          <View style={styles.locationRow}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons name="arrow-back" size={20} color="#333" />
            </TouchableOpacity>
            <View style={styles.locationDot}>
              <View style={styles.fromDot} />
            </View>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationText}>Nexus Mall Koramangala</Text>
            </View>
            <TouchableOpacity style={styles.moreButton} onPress={handleMoreOptions}>
              <Ionicons name="ellipsis-vertical" size={16} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Swap Button */}
          <View style={styles.swapContainer}>
            <TouchableOpacity style={styles.swapButton} onPress={handleLocationSwap}>
              <Ionicons name="swap-vertical" size={16} color="#333" />
            </TouchableOpacity>
          </View>

          {/* To Location */}
          <View style={styles.locationRow}>
            <View style={styles.spacer} />
            <View style={styles.locationDot}>
              <Ionicons name="location" size={16} color="#f44336" />
            </View>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationText}>Cubbon Park</Text>
            </View>
            <TouchableOpacity style={styles.refreshButton}>
              <Ionicons name="refresh" size={16} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Trip Details */}
        <View style={styles.tripDetailsContainer}>
          <View style={styles.tripInfo}>
            <Text style={styles.tripDate}>28 Aug 2025, 5:41 PM</Text>
            <Text style={styles.tripCode}>KA05AC5555</Text>
          </View>
          
          <View style={styles.busInfo}>
            <View style={styles.busIconContainer}>
              <Ionicons name="bus" size={16} color="#333" />
              <Text style={styles.busNumber}>362C</Text>
            </View>
            <View style={styles.busRoute}>
              <Text style={styles.busRouteText}>Shivajinagara</Text>
              <Text style={styles.busRouteSubtext}>Bus Station</Text>
            </View>
            <TouchableOpacity style={styles.changeBusButton} onPress={handleChangeBus}>
              <Text style={styles.changeBusText}>Change Bus</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Booking Options */}
        <View style={styles.bookingContainer}>
          <TouchableOpacity style={styles.bookTicketsButton} onPress={handleBookTickets}>
            <Text style={styles.bookTicketsText}>Book Tickets</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.bookPassButton} onPress={handleBookPass}>
            <Text style={styles.bookPassText}>Book Pass</Text>
          </TouchableOpacity>
        </View>

        {/* User Info Section */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoTitle}>Booking Details</Text>
          <View style={styles.userInfoRow}>
            <Text style={styles.userInfoLabel}>User:</Text>
            <Text style={styles.userInfoValue}>Kreeman08</Text>
          </View>
          <View style={styles.userInfoRow}>
            <Text style={styles.userInfoLabel}>Date:</Text>
            <Text style={styles.userInfoValue}>2025-08-28</Text>
          </View>
          <View style={styles.userInfoRow}>
            <Text style={styles.userInfoLabel}>Time:</Text>
            <Text style={styles.userInfoValue}>17:41:04 UTC</Text>
          </View>
          <View style={styles.userInfoRow}>
            <Text style={styles.userInfoLabel}>Route:</Text>
            <Text style={styles.userInfoValue}>Koramangala → Cubbon Park</Text>
          </View>
          <View style={styles.userInfoRow}>
            <Text style={styles.userInfoLabel}>Bus Number:</Text>
            <Text style={styles.userInfoValue}>362C</Text>
          </View>
          <View style={styles.userInfoRow}>
            <Text style={styles.userInfoLabel}>Session:</Text>
            <Text style={styles.userInfoValue}>Active</Text>
          </View>
        </View>

        {/* Recent Bookings Section */}
        <View style={styles.recentBookingsContainer}>
          <Text style={styles.recentBookingsTitle}>Recent Bookings</Text>
          <View style={styles.recentBookingItem}>
            <View style={styles.recentBookingIcon}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            </View>
            <View style={styles.recentBookingDetails}>
              <Text style={styles.recentBookingRoute}>HSR Layout → MG Road</Text>
              <Text style={styles.recentBookingDate}>2025-08-27 • Bus 245A</Text>
            </View>
            <Text style={styles.recentBookingStatus}>Completed</Text>
          </View>
          
          <View style={styles.recentBookingItem}>
            <View style={styles.recentBookingIcon}>
              <Ionicons name="time" size={20} color="#FF9800" />
            </View>
            <View style={styles.recentBookingDetails}>
              <Text style={styles.recentBookingRoute}>Electronic City → Whitefield</Text>
              <Text style={styles.recentBookingDate}>2025-08-26 • Bus 500D</Text>
            </View>
            <Text style={styles.recentBookingStatus}>Pending</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.quickActionsTitle}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            <TouchableOpacity style={styles.quickActionButton}>
              <Ionicons name="bookmark" size={20} color="#2196F3" />
              <Text style={styles.quickActionText}>Save Route</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionButton}>
              <Ionicons name="notifications" size={20} color="#2196F3" />
              <Text style={styles.quickActionText}>Set Alert</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.quickActionButton}>
              <Ionicons name="share" size={20} color="#2196F3" />
              <Text style={styles.quickActionText}>Share Trip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.bottomNavItem} onPress={() => handleNavigation('home')}>
          <Ionicons name="home" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem} onPress={() => handleNavigation('search')}>
          <Ionicons name="search" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem} onPress={() => handleNavigation('location')}>
          <Ionicons name="location" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomNavItem} onPress={() => handleNavigation('profile')}>
          <Ionicons name="person" size={24} color="#666" />
        </TouchableOpacity>
      </View>
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
  scrollContainer: {
    flex: 1,
  },
  locationContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    width: 32,
  },
  locationDot: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  fromDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  locationTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  locationText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  moreButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swapContainer: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  swapButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 56,
  },
  tripDetailsContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tripInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tripDate: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  tripCode: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  busInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  busIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA726',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  busNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 4,
  },
  busRoute: {
    flex: 1,
  },
  busRouteText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  busRouteSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  changeBusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  changeBusText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
  },
  bookingContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 24,
    gap: 12,
  },
  bookTicketsButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  bookTicketsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  bookPassButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#2196F3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bookPassText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '700',
  },
  userInfoContainer: {
    backgroundColor: '#f8f9fa',
    marginHorizontal: 16,
    marginTop: 24,
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
  recentBookingsContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recentBookingsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  recentBookingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  recentBookingIcon: {
    marginRight: 12,
  },
  recentBookingDetails: {
    flex: 1,
  },
  recentBookingRoute: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  recentBookingDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  recentBookingStatus: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  quickActionsContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickActionButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  quickActionText: {
    fontSize: 12,
    color: '#2196F3',
    fontWeight: '600',
    marginTop: 4,
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