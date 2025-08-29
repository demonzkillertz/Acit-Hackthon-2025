import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AuthContext } from '@/context/AuthContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const drivers = [
  {
    name: 'Kriman Basi',
    license: 'Ba 1 Ka 8848',
    phone: '9812345677',
    status: 'On Duty',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    duty: true,
  },
  {
    name: 'Kriman Basi',
    license: 'Ba 1 Ka 8848',
    phone: '9812345677',
    status: 'Off Duty',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    duty: false,
  },
  {
    name: 'Kriman Basi',
    license: 'Ba 1 Ka 8848',
    phone: '9812345677',
    status: 'On Duty',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    duty: true,
  },
  {
    name: 'Kriman Basi',
    license: 'Ba 1 Ka 8848',
    phone: '9812345677',
    status: 'Off Duty',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    duty: false,
  },
  {
    name: 'Kriman Basi',
    license: 'Ba 1 Ka 8848',
    phone: '9812345677',
    status: 'On Duty',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    duty: true,
  },
];

const CompanyView = () => {
  const { user, logout } = useContext(AuthContext);

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
        <Text style={styles.activeText}>Active Transportations: <Text style={styles.activeCount}>15</Text></Text>
      </View>
      {/* Drivers Section */}
      <View style={styles.driversHeader}>
        <Ionicons name="car-sport-outline" size={24} color="black" />
        <Text style={styles.driversTitle}>Drivers:</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <MaterialIcons name="filter-list" size={22} color="#333" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>
      {/* Drivers Cards */}
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {drivers.map((driver, idx) => (
          <View
            key={idx}
            style={[
              styles.driverCard,
              { backgroundColor: driver.duty ? '#111' : '#ccc' }
            ]}
          >
            <Image source={{ uri: driver.image }} style={styles.driverImg} />
            <View style={styles.driverInfo}>
              <Text style={styles.driverText}>Driver's name: <Text style={styles.driverBold}>{driver.name}</Text></Text>
              <Text style={styles.driverText}>Bus License No.: <Text style={styles.driverBold}>{driver.license}</Text></Text>
              <Text style={styles.driverText}>Phn No.: <Text style={styles.driverBold}>{driver.phone}</Text></Text>
              <Text style={styles.driverText}>Status: <Text style={styles.driverBold}>{driver.status}</Text></Text>
            </View>
          </View>
        ))}
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
});

export default CompanyView;