import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
    <Tab.Navigator>
      <Tab.Screen name="DriverHome" component={DriverView} options={{ title: 'Driver Home' }} />
      <Tab.Screen name="DriverTab2" component={DummyDriverTab} options={{ title: 'Tab 2' }} />
    </Tab.Navigator>
  );
}
