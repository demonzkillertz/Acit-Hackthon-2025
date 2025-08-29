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
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Guruji<Text style={{ fontSize: 14 }}> (गुरुजी)</Text></Text>
        <Image
          source={{ uri: user?.profilePic || 'https://randomuser.me/api/portraits/men/33.jpg' }}
          style={styles.profilePic}
        />
      </View>
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
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    marginBottom: 12,
    backgroundColor: '#fff',
    paddingVertical: 15,
    elevation: 2,
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
  // Stats Container
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  driversHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  driversTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  cardsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
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
    borderColor: '#3498db',
  },
  driverInfo: {
    flex: 1,
  },
  driverText: {
    color: '#333',
    fontSize: 15,
    marginBottom: 4,
  },
  driverBold: {
    fontWeight: 'bold',
    color: '#3498db',
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelBtn: {
    backgroundColor: '#e74c3c',
  },
  confirmBtn: {
    backgroundColor: '#27ae60',
  },
  cancelBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CompanyView;