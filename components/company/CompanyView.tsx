import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, RefreshControl, Modal, TextInput } from 'react-native';
import { AuthContext } from '@/context/AuthContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { companyService, Bus, Company } from '../../services/companyService';

const CompanyView = () => {
  const { user, logout } = useContext(AuthContext);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showAddBusModal, setShowAddBusModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [newBus, setNewBus] = useState({
    plate_number: '',
    model: '',
    capacity: '',
  });

  const loadCompanyData = async () => {
    try {
      if (user?.id) {
        const [busesData, companyData] = await Promise.all([
          companyService.getCompanyBuses(user.id),
          companyService.getCompany(user.id).catch(() => null)
        ]);
        setBuses(busesData);
        setCompany(companyData);
      }
    } catch (error) {
      console.error('Error loading company data:', error);
      Alert.alert('Error', 'Failed to load company data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadCompanyData();
  }, [user?.id]);

  const onRefresh = () => {
    setRefreshing(true);
    loadCompanyData();
  };

  const handleLogout = async () => {
    if (logout) {
      await logout();
    }
  };

  const handleAddBus = async () => {
    if (!newBus.plate_number || !newBus.model || !newBus.capacity) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      await companyService.createBus({
        plate_number: newBus.plate_number,
        company_id: user?.id || 0,
        model: newBus.model,
        capacity: parseInt(newBus.capacity)
      });
      setShowAddBusModal(false);
      setNewBus({ plate_number: '', model: '', capacity: '' });
      loadCompanyData();
      Alert.alert('Success', 'Bus added successfully!');
    } catch (error) {
      console.error('Error adding bus:', error);
      Alert.alert('Error', 'Failed to add bus');
    }
  };

  const activeBuses = buses.filter(bus => bus.driver_id && bus.latitude && bus.longitude).length;
  const totalBuses = buses.length;

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Guruji<Text style={{ fontSize: 14 }}> (गुरुजी)</Text></Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Ionicons name="log-out-outline" size={24} color="#e74c3c" />
        </TouchableOpacity>
      </View>

      {/* Menu Dropdown */}
      {showMenu && (
        <View style={styles.menuDropdown}>
          <TouchableOpacity style={styles.menuItem} onPress={() => {setShowMenu(false); /* Add profile action */}}>
            <Ionicons name="person-outline" size={20} color="#333" />
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => {setShowMenu(false); /* Add settings action */}}>
            <Ionicons name="settings-outline" size={20} color="#333" />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => {setShowMenu(false); handleLogout()}}>
            <Ionicons name="log-out-outline" size={20} color="#e74c3c" />
            <Text style={[styles.menuText, {color: '#e74c3c'}]}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Company Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="bus" size={24} color="#3498db" />
          <Text style={styles.statNumber}>{totalBuses}</Text>
          <Text style={styles.statLabel}>Total Buses</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="checkmark-circle" size={24} color="#27ae60" />
          <Text style={styles.statNumber}>{activeBuses}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="star" size={24} color="#f39c12" />
          <Text style={styles.statNumber}>{company?.rating ? Number(company.rating).toFixed(1) : '0.0'}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
      {/* Buses Header */}
      <View style={styles.driversHeader}>
        <Ionicons name="bus-outline" size={24} color="black" />
        <Text style={styles.driversTitle}>Fleet Management</Text>
        <TouchableOpacity 
          style={styles.addBtn}
          onPress={() => setShowAddBusModal(true)}
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.addText}>Add Bus</Text>
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
                <Text style={styles.driverText}>Plate Number: <Text style={styles.driverBold}>{bus.plate_number}</Text></Text>
                <Text style={styles.driverText}>Model: <Text style={styles.driverBold}>{bus.model}</Text></Text>
                <Text style={styles.driverText}>Capacity: <Text style={styles.driverBold}>{bus.capacity} seats</Text></Text>
                <Text style={styles.driverText}>Driver: <Text style={styles.driverBold}>{bus.driver_name || 'Not assigned'}</Text></Text>
                <Text style={styles.driverText}>Route: <Text style={styles.driverBold}>{bus.route_name || 'Not assigned'}</Text></Text>
                <Text style={styles.driverText}>Status: <Text style={[styles.driverBold, {color: bus.latitude && bus.longitude ? '#27ae60' : '#e74c3c'}]}>
                  {bus.latitude && bus.longitude ? 'Active' : 'Inactive'}
                </Text></Text>
                {bus.speed && (
                  <Text style={styles.driverText}>Speed: <Text style={styles.driverBold}>{bus.speed} km/h</Text></Text>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>
      
      {/* Add Bus Modal */}
      <Modal
        visible={showAddBusModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddBusModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Bus</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Plate Number (e.g., AB1234)"
              value={newBus.plate_number}
              onChangeText={(text) => setNewBus({...newBus, plate_number: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Model (e.g., Volvo B9R)"
              value={newBus.model}
              onChangeText={(text) => setNewBus({...newBus, model: text})}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Capacity (number of seats)"
              value={newBus.capacity}
              onChangeText={(text) => setNewBus({...newBus, capacity: text})}
              keyboardType="numeric"
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setShowAddBusModal(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalBtn, styles.confirmBtn]}
                onPress={handleAddBus}
              >
                <Text style={styles.confirmBtnText}>Add Bus</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f8fafc', // Softer background
    paddingTop: 40,
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    elevation: 3,
    shadowColor: '#1e293b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
    flex: 1,
    textAlign: 'center',
    color: '#1e293b', // Professional dark blue-gray
  },
  profilePic: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginLeft: 10,
    borderWidth: 2,
    borderColor: '#3b82f6', // Modern blue accent
  },
  // Stats Container - Enhanced colors
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 22,
    marginHorizontal: 6,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#1e293b',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    borderWidth: 0.5,
    borderColor: '#e2e8f0',
  },
  statNumber: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b', // Better gray
    marginTop: 6,
    fontWeight: '500',
  },
  driversHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 15,
    paddingVertical: 8,
  },
  driversTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
    color: '#1e293b',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6', // Modern blue
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  cardsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#1e293b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    borderWidth: 0.5,
    borderColor: '#e2e8f0',
  },
  driverImg: {
    width: 66,
    height: 66,
    borderRadius: 33,
    marginRight: 18,
    borderWidth: 3,
    borderColor: '#3b82f6',
  },
  driverInfo: {
    flex: 1,
  },
  driverText: {
    color: '#334155',
    fontSize: 15,
    marginBottom: 5,
    lineHeight: 20,
  },
  driverBold: {
    fontWeight: '700',
    color: '#3b82f6',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  noBusesText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#64748b',
    paddingHorizontal: 20,
    fontWeight: '500',
  },
  // Enhanced Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.6)', // Better overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 28,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#1e293b',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#1e293b',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f8fafc',
    color: '#1e293b',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 12,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cancelBtn: {
    backgroundColor: '#ef4444', // Modern red
    shadowColor: '#ef4444',
  },
  confirmBtn: {
    backgroundColor: '#10b981', // Modern green
    shadowColor: '#10b981',
  },
  cancelBtnText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  confirmBtnText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  // Enhanced Menu and logout styles
  logoutBtn: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fef2f2',
  },
  menuDropdown: {
    position: 'absolute',
    top: 70,
    left: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 8,
    shadowColor: '#1e293b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    zIndex: 1000,
    minWidth: 160,
    borderWidth: 0.5,
    borderColor: '#e2e8f0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f1f5f9',
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#334155',
    fontWeight: '500',
  },
});

export default CompanyView;