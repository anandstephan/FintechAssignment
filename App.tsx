import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LoginScreen } from './src/screens/LoginScreen';
import { OtpScreen } from './src/screens/OtpScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Otp" component={OtpScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
