import React, { useContext } from 'react';
import { AppRegistry, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RoleRouter from './app/RoleRouter';
import { AuthProvider, AuthContext } from './context/AuthContext';

const Stack = createNativeStackNavigator();

function AppContent() {
  const { user } = useContext(AuthContext);
  
  console.log('App user state:', user);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // Auth screens when not logged in
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // Role-based screens when logged in
          <Stack.Screen name="Main" component={RoleRouter} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  console.log('App component started');

  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

// Register the main component with proper names for different platforms
if (Platform.OS === 'web') {
  AppRegistry.registerComponent('App', () => App);
  AppRegistry.runApplication('App', { rootTag: document.getElementById('root') });
} else {
  AppRegistry.registerComponent('main', () => App);
}

export default App;


