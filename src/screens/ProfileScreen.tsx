import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../utils/theme';

interface MenuOptionProps {
  title: string;
  iconUrl: string;
  isLogout?: boolean;
  onPress?: () => void;
}

const MenuOption: React.FC<MenuOptionProps> = ({ title, iconUrl, isLogout, onPress }) => (
  <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
    <View style={styles.optionLeft}>
      <View style={[styles.iconContainer, isLogout && styles.logoutIconContainer]}>
        <Image 
          source={{ uri: iconUrl }} 
          style={[styles.optionIcon, isLogout && { tintColor: theme.colors.danger }]} 
        />
      </View>
      <Text style={[styles.optionTitle, isLogout && { color: theme.colors.danger }]}>
        {title}
      </Text>
    </View>
    <Text style={styles.arrowIcon}>›</Text>
  </TouchableOpacity>
);

export const ProfileScreen = ({ navigation }: any) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (e) {
      console.error('Failed to logout', e);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Info Card */}
        <View style={styles.userCard}>
          <Image 
            source={{ uri: 'https://ui-avatars.com/api/?name=Anupam&background=C8960C&color=fff' }} 
            style={styles.profileImage} 
          />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>Anupam</Text>
            <Text style={styles.userPhone}>+91 9810123987</Text>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.section}>
          <MenuOption 
            title="Profile details" 
            iconUrl="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" 
          />
          <MenuOption 
            title="General details" 
            iconUrl="https://cdn-icons-png.flaticon.com/512/726/726115.png" 
          />
          <MenuOption 
            title="Settings" 
            iconUrl="https://cdn-icons-png.flaticon.com/512/2099/2099058.png" 
          />
        </View>

        <View style={styles.section}>
          <MenuOption 
            title="Logout" 
            iconUrl="https://cdn-icons-png.flaticon.com/512/1828/1828479.png" 
            isLogout={true}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  scrollContent: {
    padding: theme.spacing.m,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.l,
    marginBottom: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  userDetails: {
    marginLeft: theme.spacing.m,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  section: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    marginBottom: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(200, 150, 12, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  logoutIconContainer: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  optionIcon: {
    width: 20,
    height: 20,
    tintColor: theme.colors.primary,
  },
  optionTitle: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '500',
  },
  arrowIcon: {
    fontSize: 24,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
});
