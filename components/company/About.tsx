import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function About() {
  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Ionicons name="arrow-back" size={26} color="#222" />
        <Text style={styles.headerTitle}>Account</Text>
        <View style={{ width: 26 }} /> {/* Placeholder for right side icon */}
      </View>

      {/* Profile Section */}
      <View style={styles.section}>
        <View style={styles.profileRow}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
            style={styles.avatar}
          />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.name}>Siddhartha Manandhar</Text>
            <Text style={styles.phone}>9812345678</Text>
            <View style={styles.roleBadge}>
              <Ionicons name="star" size={16} color="#fff" />
              <Text style={styles.roleBadgeText}>Manager</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Notifications Section */}
      <View style={styles.section}>
        <View style={styles.notificationsHeaderRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="notifications" size={20} color="#222" />
            <Text style={styles.notificationsTitle}>Notifications</Text>
          </View>
          <TouchableOpacity style={styles.moreBtn}>
            <Text style={styles.moreText}>More</Text>
            <Ionicons name="chevron-forward" size={18} color="#222" />
          </TouchableOpacity>
        </View>
        <View style={styles.notificationCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.dot} />
            <Text style={styles.notificationBold}>Guruji has a new feature.</Text>
          </View>
          <Text style={styles.notificationSub}>Click here to learn new tools to help your business.</Text>
        </View>
      </View>

      {/* Saved Address Section */}
      <TouchableOpacity style={styles.sectionRow}>
        <MaterialCommunityIcons name="bookmark" size={22} color="#222" />
        <Text style={styles.sectionRowText}>Saved Address</Text>
      </TouchableOpacity>

      {/* Log Out Section */}
      <TouchableOpacity style={styles.sectionRow}>
        <MaterialCommunityIcons name="logout" size={22} color="#222" />
        <Text style={styles.sectionRowText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ededed',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: '#222',
  },
  section: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 8,
    borderColor: '#ededed',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 1,
  },
  phone: {
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#fab900',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 2,
  },
  roleBadgeText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 14,
    marginLeft: 4,
  },
  notificationsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
  },
  notificationsTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 7,
    color: '#222',
  },
  moreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ededed',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  moreText: {
    fontSize: 13,
    fontWeight: '500',
    marginRight: 2,
    color: '#222',
  },
  notificationCard: {
    backgroundColor: '#ededed',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginTop: 2,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#db2c2c',
    marginRight: 6,
  },
  notificationBold: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
  },
  notificationSub: {
    color: '#222',
    fontSize: 13,
    marginLeft: 16,
    marginTop: 2,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderBottomWidth: 2,
    borderColor: '#ededed',
  },
  sectionRowText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#222',
    fontWeight: '500',
  },
});