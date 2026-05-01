import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../utils/theme';

export const OtpScreen = ({ navigation }: any) => {
  const [otp, setOtp] = useState('');

  const verifyOtp = async () => {
    if (otp === '1234') {
      try {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        navigation.replace('Dashboard');
      } catch (e) {
        console.error('Failed to save login state', e);
        navigation.replace('Dashboard'); // Fallback to navigate anyway
      }
    } else {
      Alert.alert('Invalid OTP', 'Please enter 1234');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.title}>Verify OTP</Text>
        <View style={styles.titleUnderline} />
        
        <Text style={styles.subtitle}>Enter the 4-digit OTP sent to your mobile number.</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Enter OTP</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="----"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="number-pad"
              maxLength={4}
              value={otp}
              onChangeText={setOtp}
              autoFocus
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.sendOtpText}>Verify & Proceed</Text>
          <TouchableOpacity style={styles.sendOtpButton} onPress={verifyOtp}>
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
    marginBottom: theme.spacing.m,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: theme.spacing.xl,
  },
  card: {
    backgroundColor: '#D4B872',
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    paddingBottom: theme.spacing.s,
  },
  input: {
    fontSize: 32,
    color: '#000',
    padding: 0,
    letterSpacing: 8,
    textAlign: 'center',
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
