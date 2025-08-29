import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

// Import all your screens from the same directory
import UserView from '../../components/user/UserView';
import Search from '../../components/user/Search';
import Location from '../../components/user/Location';
import UserProfile from '../../components/user/UserProfile';

const Tab = createBottomTabNavigator();

export default function UserTabs() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Location') {
            iconName = focused ? 'location' : 'location-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 5,
          paddingTop: 8,
          height: Platform.OS === 'ios' ? 70 + insets.bottom : 60,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
      })}
    >
      <Tab.Screen name="Home" component={UserView} options={{ title: 'Home' }} />
      <Tab.Screen name="Search" component={Search} options={{ title: 'Search' }} />
      <Tab.Screen name="Location" component={Location} options={{ title: 'Location' }} />
      <Tab.Screen name="Profile" component={UserProfile} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
