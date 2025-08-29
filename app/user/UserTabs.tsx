import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import all your screens from the same directory
import UserView from '../../components/user/UserView';
import Book from '../../components/user/Book';
// import Explore from '../../components/user/Explore';
import Home from '../../components/user/index';
import Location from '../../components/user/Location';
import Routes from '../../components/user/Routes';
import Search from '../../components/user/Search';
import Track from '../../components/user/Track';

const Tab = createBottomTabNavigator();

export default function UserTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} options={{ title: 'Home' }} />
      <Tab.Screen name="UserView" component={UserView} options={{ title: 'User Home' }} />
      <Tab.Screen name="Book" component={Book} options={{ title: 'Book' }} />
      {/* <Tab.Screen name="Explore" component={Explore} options={{ title: 'Explore' }} /> */}
      <Tab.Screen name="Location" component={Location} options={{ title: 'Location' }} />
      <Tab.Screen name="Routes" component={Routes} options={{ title: 'Routes' }} />
      <Tab.Screen name="Search" component={Search} options={{ title: 'Search' }} />
      <Tab.Screen name="Track" component={Track} options={{ title: 'Track' }} />
    </Tab.Navigator>
  );
}
