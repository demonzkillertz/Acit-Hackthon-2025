import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DriverView from '../../components/driver/DriverView';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

function DummyDriverTab() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Driver Tab 2 (Sample)</Text>
    </View>
  );
}

export default function DriverTabs() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'DriverHome') {
            iconName = focused ? 'speedometer' : 'speedometer-outline';
          } else if (route.name === 'DriverTab2') {
            iconName = focused ? 'clipboard' : 'clipboard-outline';
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
      <Tab.Screen name="DriverHome" component={DriverView} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="DriverTab2" component={DummyDriverTab} options={{ title: 'Reports' }} />
    </Tab.Navigator>
  );
}
