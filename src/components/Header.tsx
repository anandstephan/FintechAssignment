import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { theme } from '../utils/theme';

interface HeaderProps {
  data: {
    greeting: string;
    user_name: string;
    profile_icon: string;
    notification_icon: string;
  };
}

export const Header: React.FC<HeaderProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image source={{ uri: data.profile_icon }} style={styles.profileIcon} />
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>{data.greeting},</Text>
          <Text style={styles.userName}>{data.user_name}</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <View style={styles.iconContainer}>
          <Image source={{ uri: data.notification_icon }} style={styles.notificationIcon} />
          {/* Notification Badge */}
          <View style={styles.badge} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.m,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.round,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  textContainer: {
    marginLeft: theme.spacing.m,
  },
  greeting: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  rightSection: {
    justifyContent: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationIcon: {
    width: 20,
    height: 20,
    tintColor: theme.colors.primary,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.danger,
    borderWidth: 1,
    borderColor: theme.colors.surface,
  },
});
