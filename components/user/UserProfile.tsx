import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Switch } from 'react-native';
import { AuthContext } from '@/context/AuthContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const UserProfile = () => {
  const { user, logout } = useContext(AuthContext);
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          onPress: async () => {
            if (logout) {
              await logout();
            }
          }
        }
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Password change feature coming soon!');
  };

  const handleSupport = () => {
    Alert.alert('Support', 'Contact support at support@guruji.com');
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: user?.profilePic || 'https://randomuser.me/api/portraits/men/33.jpg' }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{user?.username || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
          <Text style={styles.userRole}>Passenger</Text>
          
          <TouchableOpacity style={styles.editProfileBtn} onPress={handleEditProfile}>
            <Ionicons name="pencil" size={16} color="#3498db" />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
            <View style={styles.menuIcon}>
              <Ionicons name="person-outline" size={22} color="#333" />
            </View>
            <Text style={styles.menuText}>Personal Information</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleChangePassword}>
            <View style={styles.menuIcon}>
              <Ionicons name="lock-closed-outline" size={22} color="#333" />
            </View>
            <Text style={styles.menuText}>Change Password</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <View style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons name="notifications-outline" size={22} color="#333" />
            </View>
            <Text style={styles.menuText}>Push Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: '#3498db' }}
              thumbColor={notifications ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons name="location-outline" size={22} color="#333" />
            </View>
            <Text style={styles.menuText}>Location Sharing</Text>
            <Switch
              value={locationSharing}
              onValueChange={setLocationSharing}
              trackColor={{ false: '#767577', true: '#3498db' }}
              thumbColor={locationSharing ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons name="moon-outline" size={22} color="#333" />
            </View>
            <Text style={styles.menuText}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#767577', true: '#3498db' }}
              thumbColor={darkMode ? '#fff' : '#f4f3f4'}
            />
          </View>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons name="language-outline" size={22} color="#333" />
            </View>
            <Text style={styles.menuText}>Language</Text>
            <View style={styles.languageContainer}>
              <Text style={styles.languageText}>English</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleSupport}>
            <View style={styles.menuIcon}>
              <Ionicons name="help-circle-outline" size={22} color="#333" />
            </View>
            <Text style={styles.menuText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons name="document-text-outline" size={22} color="#333" />
            </View>
            <Text style={styles.menuText}>Terms & Conditions</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons name="shield-outline" size={22} color="#333" />
            </View>
            <Text style={styles.menuText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons name="information-circle-outline" size={22} color="#333" />
            </View>
            <Text style={styles.menuText}>App Version</Text>
            <Text style={styles.versionText}>1.0.0</Text>
          </View>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons name="star-outline" size={22} color="#333" />
            </View>
            <Text style={styles.menuText}>Rate App</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Logout Section */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
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
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 15,
    elevation: 2,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  profileContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 30,
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  userRole: {
    fontSize: 14,
    color: '#3498db',
    marginBottom: 20,
    fontWeight: '500',
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editProfileText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 5,
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 15,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    width: 30,
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  versionText: {
    fontSize: 14,
    color: '#666',
  },
  logoutContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  logoutBtn: {
    flexDirection: 'row',
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  bottomSpacer: {
    height: 20,
  },
});

export default UserProfile;
