import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import all your screens from the same directory
import UserView from '../../components/user/UserView';
import BrowseCompanies from '../../components/user/BrowseCompanies';
import Search from '../../components/user/Search';
import Track from '../../components/user/Track';
import Routes from '../../components/user/Routes';

const Tab = createBottomTabNavigator();

export default function UserTabs() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Companies') {
            iconName = focused ? 'business' : 'business-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Track') {
            iconName = focused ? 'locate' : 'locate-outline';
          } else if (route.name === 'Routes') {
            iconName = focused ? 'map' : 'map-outline';
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
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={UserView} options={{ title: 'Home' }} />
      <Tab.Screen name="Companies" component={BrowseCompanies} options={{ title: 'Companies' }} />
      <Tab.Screen name="Search" component={Search} options={{ title: 'Search' }} />
      <Tab.Screen name="Track" component={Track} options={{ title: 'Track' }} />
      <Tab.Screen name="Routes" component={Routes} options={{ title: 'Routes' }} />
    </Tab.Navigator>
  );
}
