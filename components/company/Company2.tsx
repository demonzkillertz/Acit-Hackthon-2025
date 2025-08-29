import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const recentSearches = [
  {
    type: "driver",
    name: "Kriman Basi",
    license: "Ba 1 Ka 8848",
    phone: "9812345677",
    status: "On Duty",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    duty: true,
  },
  {
    type: "user",
    name: "Nabi Bajracharya",
    userId: "800334",
    phone: "9809131017",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  {
    type: "driver",
    name: "Alison Shivahari",
    license: "Ba 1 Ka 8849",
    phone: "9812345676",
    status: "Off Duty",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    duty: false,
  },
  // Add more data as needed
];

export default function Company2() {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(recentSearches);

const handleSearch = (text: string) => {
    setSearch(text);
    if (!text) {
      setFiltered(recentSearches);
      return;
    }
    const lower = text.toLowerCase();
    setFiltered(
      recentSearches.filter(item => {
        return (
          (item.name && item.name.toLowerCase().includes(lower)) ||
          (item.license && item.license.toLowerCase().includes(lower)) ||
          (item.phone && item.phone.includes(lower)) ||
          ((item as any).userId && (item as any).userId.toLowerCase().includes(lower)) ||
          (item.status && item.status.toLowerCase().includes(lower)) 
        );
      }) 
    );
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
          source={{ uri: 'https://randomuser.me/api/portraits/men/33.jpg' }}
          style={styles.profilePic}
        />
      </View>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={22} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Users, Drivers and Stations"
          value={search}
          onChangeText={handleSearch}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity>
          <Ionicons name="mic-outline" size={22} color="#888" style={styles.micIcon} />
        </TouchableOpacity>
      </View>
      {/* Recent Searches */}
      <Text style={styles.recentTitle}>Recent searches:</Text>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {filtered.map((item, idx) => (
          <View
            key={idx}
            style={[
              styles.card,
              { backgroundColor: item.duty === false ? '#ccc' : '#111' }
            ]}
          >
            <Image source={{ uri: item.image }} style={styles.cardImg} />
            <View style={styles.cardInfo}>
              {item.type === "driver" ? (
                <>
                  <Text style={styles.cardText}>Driver's name: <Text style={styles.cardBold}>{item.name || 'N/A'}</Text></Text>
                  <Text style={styles.cardText}>Bus License No.: <Text style={styles.cardBold}>{item.license || 'N/A'}</Text></Text>
                  <Text style={styles.cardText}>Phn No.: <Text style={styles.cardBold}>{item.phone || 'N/A'}</Text></Text>
                  <Text style={styles.cardText}>Status: <Text style={styles.cardBold}>{item.status || 'N/A'}</Text></Text>
                </>
              ) : (
                <>
                  <Text style={styles.cardText}>User's name: <Text style={styles.cardBold}>{item.name || 'N/A'}</Text></Text>
                  <Text style={styles.cardText}>User ID : <Text style={styles.cardBold}>{(item as any).userId || 'N/A'}</Text></Text>
                  <Text style={styles.cardText}>Phn No.: <Text style={styles.cardBold}>{item.phone || 'N/A'}</Text></Text>
                </>
              )}
            </View>
          </View>
        ))}
        {filtered.length === 0 && (
          <Text style={styles.noResult}>No results found.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 4,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 2,
    borderColor: '#29a8ff',
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'transparent',
  },
  searchIcon: {
    marginRight: 4,
  },
  micIcon: {
    marginLeft: 4,
  },
  recentTitle: {
    fontWeight: 'bold',
    marginLeft: 20,
    fontSize: 16,
    marginBottom: 8,
    marginTop: 5,
  },
  cardsContainer: {
    paddingHorizontal: 12,
    paddingBottom: 60,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  cardImg: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  cardInfo: {
    flex: 1,
  },
  cardText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 3,
  },
  cardBold: {
    fontWeight: 'bold',
    color: '#ffb700',
  },
  noResult: {
    textAlign: 'center',
    marginTop: 24,
    color: '#888',
    fontSize: 16,
  },
});
