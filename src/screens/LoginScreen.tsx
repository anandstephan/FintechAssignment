import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { theme } from '../utils/theme';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [mobile, setMobile] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2800/2800160.png' }} 
            style={styles.logoIcon}
          />
          <View>
            <Text style={styles.logoText}>Gold</Text>
            <Text style={styles.logoText}>Century</Text>
          </View>
        </View>

        <Text style={styles.title}>Login</Text>
        <View style={styles.titleUnderline} />

        <View style={styles.card}>
          <Text style={styles.label}>Enter Mobile Number</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.input}
              placeholder="9810123987"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="number-pad"
              maxLength={10}
              value={mobile}
              onChangeText={setMobile}
            />
          </View>

          <Text style={[styles.label, { marginTop: theme.spacing.m }]}>Select your gold partner</Text>
          <View style={styles.dropdown}>
            <View style={styles.dropdownIconContainer}>
              <Text style={styles.dropdownIcon}>🏆</Text>
            </View>
            <Text style={styles.dropdownText}>MMTC PAMP</Text>
            <Text style={styles.dropdownArrow}>v</Text>
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.registerLink}>Register Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.sendOtpText}>Send OTP</Text>
          <TouchableOpacity style={styles.sendOtpButton} onPress={onLogin}>
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
    padding: theme.spacing.xl,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  logoIcon: {
    width: 40,
    height: 40,
    marginRight: theme.spacing.s,
    tintColor: theme.colors.primary,
  },
  logoText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '300',
    letterSpacing: 1,
  },
  title: {
    fontSize: 32,
    color: theme.colors.primary,
    fontWeight: '300',
    marginBottom: 8,
  },
  titleUnderline: {
    width: 40,
    height: 2,
    backgroundColor: theme.colors.primary,
    marginBottom: theme.spacing.xl,
  },
  card: {
    backgroundColor: '#D4B872', // Goldish card background matching reference
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  label: {
    color: '#333',
    fontSize: 14,
    marginBottom: theme.spacing.s,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    paddingBottom: theme.spacing.s,
  },
  countryCode: {
    color: '#000',
    fontSize: 18,
    marginRight: theme.spacing.s,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#000',
    padding: 0,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    paddingBottom: theme.spacing.s,
    marginTop: theme.spacing.s,
  },
  dropdownIconContainer: {
    marginRight: theme.spacing.s,
  },
  dropdownIcon: {
    fontSize: 18,
  },
  dropdownText: {
    flex: 1,
    color: '#000',
    fontSize: 16,
  },
  dropdownArrow: {
    color: '#000',
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.xl,
  },
  registerText: {
    color: '#333',
    fontSize: 12,
  },
  registerLink: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  sendOtpText: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: theme.spacing.m,
  },
  sendOtpButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
