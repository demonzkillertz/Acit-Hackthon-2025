import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, RefreshControl, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { companyService, Company } from '../../services/companyService';

const BrowseCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadCompanies = async () => {
    try {
      const companiesData = await companyService.getAllCompanies();
      setCompanies(companiesData);
    } catch (error) {
      console.error('Error loading companies:', error);
      Alert.alert('Error', 'Failed to load companies');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadCompanies();
  };

  const renderStars = (rating: number | undefined) => {
    const safeRating = rating || 0;
    const stars = [];
    const fullStars = Math.floor(safeRating);
    const hasHalfStar = safeRating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={i} name="star" size={16} color="#f39c12" />);
    }

    if (hasHalfStar) {
      stars.push(<Ionicons key="half" name="star-half" size={16} color="#f39c12" />);
    }

    const emptyStars = 5 - Math.ceil(safeRating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#f39c12" />);
    }

    return stars;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bus Companies</Text>
        <Text style={styles.headerSubtitle}>Choose your preferred operator</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <Text style={styles.loadingText}>Loading companies...</Text>
        ) : companies.length === 0 ? (
          <Text style={styles.noDataText}>No companies found</Text>
        ) : (
          companies.map((company) => (
            <TouchableOpacity
              key={company.id}
              style={styles.companyCard}
              activeOpacity={0.8}
            >
              <View style={styles.companyHeader}>
                <Image
                  source={{ uri: company.logo_url || 'https://cdn-icons-png.flaticon.com/512/744/744465.png' }}
                  style={styles.companyLogo}
                />
                <View style={styles.companyInfo}>
                  <Text style={styles.companyName}>{company.name}</Text>
                  <Text style={styles.companyDescription} numberOfLines={2}>
                    {company.description}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <View style={styles.starsContainer}>
                      {renderStars(company.rating)}
                    </View>
                    <Text style={styles.ratingText}>
                      {company.rating ? Number(company.rating).toFixed(1) : '0.0'} ({company.total_reviews || 0} reviews)
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.companyStats}>
                <View style={styles.statItem}>
                  <Ionicons name="bus" size={16} color="#3498db" />
                  <Text style={styles.statText}>{company.fleet_size || 0} buses</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="time" size={16} color="#27ae60" />
                  <Text style={styles.statText}>Est. {company.established_year || 'N/A'}</Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="location" size={16} color="#e74c3c" />
                  <Text style={styles.statText}>Multiple routes</Text>
                </View>
              </View>

              <View style={styles.companyActions}>
                <TouchableOpacity style={[styles.actionBtn, styles.trackBtn]}>
                  <Ionicons name="navigate" size={18} color="#fff" />
                  <Text style={styles.actionBtnText}>Track Buses</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, styles.infoBtn]}>
                  <Ionicons name="information-circle" size={18} color="#3498db" />
                  <Text style={[styles.actionBtnText, { color: '#3498db' }]}>Details</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  scrollContainer: {
    padding: 15,
    paddingBottom: 80, // Reduced from 100 to match smaller tab bar
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  companyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  companyHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  companyDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
  },
  companyStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  companyActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  trackBtn: {
    backgroundColor: '#3498db',
  },
  infoBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3498db',
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#fff',
  },
});

export default BrowseCompanies;
