import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CompanyView from '../../components/company/CompanyView';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

function DummyCompanyTab() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Company Tab 2 (Sample)</Text>
    </View>
  );
}

export default function CompanyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="CompanyHome" component={CompanyView} options={{ title: 'Company Home' }} />
      <Tab.Screen name="CompanyTab2" component={DummyCompanyTab} options={{ title: 'Tab 2' }} />
    </Tab.Navigator>
  );
}
