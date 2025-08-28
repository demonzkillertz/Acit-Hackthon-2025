import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CompanyView from '../../components/company/CompanyView';
import Company2 from '../../components/company/Company2';
import About from '../../components/company/About';
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
      <Tab.Screen name="CompanyTab2" component={Company2} options={{ title: 'Company2' }} />
      <Tab.Screen name="CompanyTab3" component={DummyCompanyTab} options={{ title: 'Tab 3' }} />
      <Tab.Screen name="CompanyTab4" component={About} options={{ title: 'About' }} />
    </Tab.Navigator>
  );
}
