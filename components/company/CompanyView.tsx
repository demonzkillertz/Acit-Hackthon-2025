import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { AuthContext } from '@/context/AuthContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { companyService, Bus } from '../../services/companyService';

const CompanyView = () => {
  const { user, logout } = useContext(AuthContext);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeBuses, setActiveBuses] = useState(0);

  const loadBuses = async () => {
    try {
      if (user?.id) {
        const busesData = await companyService.getCompanyBuses(user.id);
        setBuses(busesData);
        // Count active buses (assuming buses with driver_id are active)
        setActiveBuses(busesData.filter(bus => bus.driver_id).length);
      }
    } catch (error) {
      console.error('Error loading buses:', error);
      Alert.alert('Error', 'Failed to load buses');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadBuses();
  }, [user?.id]);

  const onRefresh = () => {
    setRefreshing(true);
    loadBuses();
  };

  const handleLogout = async () => {
    if (logout) {
      await logout();
    }
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Guruji<Text style={{ fontSize: 14 }}> (गुरुजी)</Text></Text>
        <Image
          source={{ uri: user?.profilePic || 'https://randomuser.me/api/portraits/men/33.jpg' }}
          style={styles.profilePic}
        />
      </View>
      {/* Active Transportations */}
      <View style={styles.activeContainer}>
        <Text style={styles.activeText}>Active Transportations: <Text style={styles.activeCount}>{activeBuses}</Text></Text>
      </View>
      {/* Drivers Section */}
      <View style={styles.driversHeader}>
        <Ionicons name="car-sport-outline" size={24} color="black" />
        <Text style={styles.driversTitle}>Buses:</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <MaterialIcons name="filter-list" size={22} color="#333" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>
      {/* Buses Cards */}
      <ScrollView 
        contentContainerStyle={styles.cardsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <Text style={styles.loadingText}>Loading buses...</Text>
        ) : buses.length === 0 ? (
          <Text style={styles.noBusesText}>No buses found. Add some buses to get started!</Text>
        ) : (
          buses.map((bus) => (
            <View
              key={bus.id}
              style={[
                styles.driverCard,
                { backgroundColor: bus.driver_id ? '#111' : '#ccc' }
              ]}
            >
              <Image 
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/744/744465.png' }} 
                style={styles.driverImg} 
              />
              <View style={styles.driverInfo}>
                <Text style={styles.driverText}>Bus Number: <Text style={styles.driverBold}>{bus.number}</Text></Text>
                <Text style={styles.driverText}>Driver: <Text style={styles.driverBold}>{bus.driver_name || 'Not assigned'}</Text></Text>
                <Text style={styles.driverText}>Route: <Text style={styles.driverBold}>{bus.route_name || 'Not assigned'}</Text></Text>
                <Text style={styles.driverText}>Status: <Text style={styles.driverBold}>{bus.driver_id ? 'Active' : 'Inactive'}</Text></Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
    flex: 1,
    textAlign: 'center'
  },
  profilePic: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 10,
  },
  activeContainer: {
    backgroundColor: '#111',
    borderRadius: 12,
    marginHorizontal: 24,
    paddingVertical: 10,
    marginBottom: 18,
    marginTop: 2,
    alignItems: 'center',
  },
  activeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  activeCount: {
    color: '#ffb700',
    fontWeight: 'bold',
  },
  driversHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 28,
    marginBottom: 10,
    gap: 8,
  },
  driversTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginLeft: 8,
  },
  filterText: {
    fontSize: 15,
    marginLeft: 3,
    color: '#444',
  },
  cardsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  driverImg: {
    width: 66,
    height: 66,
    borderRadius: 33,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  driverInfo: {
    flex: 1,
  },
  driverText: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 4,
  },
  driverBold: {
    fontWeight: 'bold',
    color: '#ffb700',
  },
  logoutContainer: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#666',
  },
  noBusesText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#666',
    paddingHorizontal: 20,
  },
});

export default CompanyView;