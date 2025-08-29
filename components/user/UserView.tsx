import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import { AuthContext } from '@/context/AuthContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { userService, Favorite, Alert as UserAlert } from '../../services/userService';

const UserView = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [alerts, setAlerts] = useState<UserAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadUserData = async () => {
    try {
      if (user?.id) {
        const [favoritesData, alertsData] = await Promise.all([
          userService.getUserFavorites(user.id),
          userService.getUserAlerts(user.id)
        ]);
        setFavorites(favoritesData);
        setAlerts(alertsData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [user?.id]);

  const onRefresh = () => {
    setRefreshing(true);
    loadUserData();
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

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Welcome Section */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome, {user?.username}!</Text>
          <Text style={styles.subtitleText}>Your Bus Tracking Dashboard</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="heart" size={24} color="#e74c3c" />
            <Text style={styles.statNumber}>{favorites.length}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="notifications" size={24} color="#f39c12" />
            <Text style={styles.statNumber}>{alerts.length}</Text>
            <Text style={styles.statLabel}>Alerts</Text>
          </View>
        </View>

        {/* Recent Alerts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="notifications-outline" size={20} color="#333" />
            <Text style={styles.sectionTitle}>Recent Alerts</Text>
          </View>
          {loading ? (
            <Text style={styles.loadingText}>Loading alerts...</Text>
          ) : alerts.length === 0 ? (
            <Text style={styles.noDataText}>No alerts yet</Text>
          ) : (
            alerts.slice(0, 3).map((alert) => (
              <View key={alert.id} style={styles.alertCard}>
                <View style={styles.alertIcon}>
                  <Ionicons 
                    name={alert.type === 'safety' ? 'shield-checkmark' : 'information-circle'} 
                    size={20} 
                    color="#fff" 
                  />
                </View>
                <View style={styles.alertContent}>
                  <Text style={styles.alertType}>{alert.type.toUpperCase()}</Text>
                  <Text style={styles.alertMessage}>{alert.message}</Text>
                  <Text style={styles.alertTime}>{new Date(alert.timestamp).toLocaleString()}</Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="location" size={32} color="#e74c3c" />
              <Text style={styles.actionText}>Track Bus</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="star" size={32} color="#f39c12" />
              <Text style={styles.actionText}>Favorites</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 15,
    backgroundColor: '#fff',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
    flex: 1,
    textAlign: 'center',
  },
  profilePic: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80, // Reduced from 100 to match smaller tab bar
  },
  welcomeContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 15,
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
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  loadingText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
  noDataText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f39c12',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  alertContent: {
    flex: 1,
  },
  alertType: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#f39c12',
    marginBottom: 5,
  },
  alertMessage: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  alertTime: {
    fontSize: 12,
    color: '#666',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 1,
  },
  actionText: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default UserView;
