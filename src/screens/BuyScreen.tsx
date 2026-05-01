import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { theme } from '../utils/theme';

export const BuyScreen = ({ navigation }: any) => {
  const [isRupees, setIsRupees] = useState(true);
  const [amount, setAmount] = useState('');
  
  const quickAmounts = [500, 1000, 5000, 10000];
  const goldRate = 9253; // Fixed rate for calculation in this demo

  const calculateGrams = () => {
    if (!amount) return '0.0000';
    if (isRupees) {
      return (parseFloat(amount) / goldRate).toFixed(4);
    }
    return amount;
  };

  const calculateRupees = () => {
    if (!amount) return '0';
    if (!isRupees) {
      return (parseFloat(amount) * goldRate).toLocaleString();
    }
    return amount;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Buy Digital Gold</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Gold Rate Info */}
        <View style={styles.rateCard}>
          <Text style={styles.rateLabel}>Current Buying Price (incl. GST)</Text>
          <Text style={styles.rateValue}>₹{goldRate}/gm</Text>
        </View>

        {/* Toggle Section */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleButton, isRupees && styles.activeToggle]} 
            onPress={() => setIsRupees(true)}
          >
            <Text style={[styles.toggleText, isRupees && styles.activeToggleText]}>In Rupees</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleButton, !isRupees && styles.activeToggle]} 
            onPress={() => setIsRupees(false)}
          >
            <Text style={[styles.toggleText, !isRupees && styles.activeToggleText]}>In Grams</Text>
          </TouchableOpacity>
        </View>

        {/* Input Section */}
        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>Enter {isRupees ? 'Amount' : 'Weight'}</Text>
          <View style={styles.inputWrapper}>
            {isRupees && <Text style={styles.currencyPrefix}>₹</Text>}
            <TextInput
              style={styles.input}
              placeholder={isRupees ? "500" : "0.05"}
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            {!isRupees && <Text style={styles.unitSuffix}>gm</Text>}
          </View>
          
          <View style={styles.conversionRow}>
            <Text style={styles.conversionText}>
              {isRupees ? `≈ ${calculateGrams()} gm` : `≈ ₹${calculateRupees()}`}
            </Text>
          </View>
        </View>

        {/* Quick Add Chips */}
        {isRupees && (
          <View style={styles.chipsRow}>
            {quickAmounts.map((val) => (
              <TouchableOpacity 
                key={val} 
                style={styles.chip}
                onPress={() => setAmount(val.toString())}
              >
                <Text style={styles.chipText}>+₹{val}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>• Pure 24K 99.9% Digital Gold</Text>
          <Text style={styles.infoText}>• Secured in 100% insured lockers</Text>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.m,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: theme.colors.text,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  scrollContent: {
    padding: theme.spacing.m,
  },
  rateCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.l,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  rateLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  rateValue: {
    color: theme.colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: 4,
    marginBottom: theme.spacing.l,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: theme.borderRadius.m - 2,
  },
  activeToggle: {
    backgroundColor: theme.colors.primary,
  },
  toggleText: {
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  activeToggleText: {
    color: theme.colors.background,
  },
  inputCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.l,
    borderRadius: theme.borderRadius.l,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.m,
  },
  inputLabel: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: theme.spacing.m,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
    paddingBottom: 8,
  },
  currencyPrefix: {
    fontSize: 32,
    color: theme.colors.text,
    marginRight: 4,
  },
  unitSuffix: {
    fontSize: 24,
    color: theme.colors.text,
    marginLeft: 8,
  },
  input: {
    flex: 1,
    fontSize: 32,
    color: theme.colors.text,
    fontWeight: 'bold',
    padding: 0,
  },
  conversionRow: {
    marginTop: theme.spacing.m,
  },
  conversionText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: theme.spacing.xl,
  },
  chip: {
    backgroundColor: 'rgba(200, 150, 12, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(200, 150, 12, 0.3)',
  },
  chipText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  infoContainer: {
    marginTop: theme.spacing.m,
  },
  infoText: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginBottom: 8,
  },
  footer: {
    padding: theme.spacing.m,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  buyButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    alignItems: 'center',
  },
  buyButtonText: {
    color: theme.colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
