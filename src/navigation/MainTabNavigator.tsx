import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../screens/DashboardScreen';
import { BuyScreen } from '../screens/BuyScreen';
import { SellScreen } from '../screens/SellScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { theme } from '../utils/theme';

const Tab = createBottomTabNavigator();

const CustomTabBarIcon = ({ focused, name }: { focused: boolean; name: string }) => {
  return (
    <View style={styles.iconContainer}>
      <Text style={[styles.icon, { color: focused ? theme.colors.primary : '#888' }]}>
        {name === 'Home' ? '🏠' : name === 'Buy' ? '🛒' : name === 'Sell' ? '💸' : '👤'}
      </Text>
      {focused && <View style={styles.activeIndicator} />}
    </View>
  );
};

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => <CustomTabBarIcon focused={focused} name={route.name} />,
        tabBarLabel: ({ focused }) => (
          <Text style={[styles.label, { color: focused ? theme.colors.primary : '#888' }]}>
            {route.name.toLowerCase()}
          </Text>
        ),
        tabBarStyle: route.name === 'Home' ? { display: 'none' } : styles.tabBar,
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Buy" component={BuyScreen} />
      <Tab.Screen name="Sell" component={SellScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: '#1A1A1A',
    borderRadius: 30,
    height: 70,
    borderWidth: 1,
    borderColor: 'rgba(200, 150, 12, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  icon: {
    fontSize: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -20,
    width: 20,
    height: 3,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
});
