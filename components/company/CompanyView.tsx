import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '@/context/AuthContext';

const CompanyView = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    if (logout) {
      await logout();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user?.username}!</Text>
      <Text style={styles.subtitle}>Company Dashboard</Text>
      <Text>Company View (Dummy)</Text>
      
      <View style={styles.logoutContainer}>
        <Button title="Logout" onPress={handleLogout} color="#ff4444" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  logoutContainer: {
    marginTop: 30,
    width: 200,
  },
});

export default CompanyView;
