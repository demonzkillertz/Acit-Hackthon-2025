import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserView from '../../components/user/UserView';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

function DummyUserTab() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User Tab 2 (Sample)</Text>
    </View>
  );
}

export default function UserTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="UserHome" component={UserView} options={{ title: 'User Home' }} />
      <Tab.Screen name="UserTab2" component={DummyUserTab} options={{ title: 'Tab 2' }} />
    </Tab.Navigator>
  );
}
