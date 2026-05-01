import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../utils/theme';

interface GoldRateBannerProps {
  data: {
    title: string;
    price: string;
    change: string;
    updated_at: string;
    cta_text: string;
  };
  enableLiveGoldRate?: boolean;
}

export const GoldRateBanner: React.FC<GoldRateBannerProps> = ({ data, enableLiveGoldRate = true }) => {
  const [currentPrice, setCurrentPrice] = useState(data.price);
  const [currentChange, setCurrentChange] = useState(data.change);
  const [updatedAt, setUpdatedAt] = useState(data.updated_at);
  const [highlight, setHighlight] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 minutes in seconds

  // Simulate WebSocket updates
  useEffect(() => {
    if (!enableLiveGoldRate) return;

    const interval = setInterval(() => {
      // Mocking a price fluctuation
      const basePrice = 9200;
      const randomFluctuation = Math.floor(Math.random() * 100) - 20; // -20 to +80
      const newPriceValue = basePrice + randomFluctuation;
      
      const newChange = randomFluctuation > 0 ? `+Rs.${randomFluctuation}` : `-Rs.${Math.abs(randomFluctuation)}`;
      
      setCurrentPrice(`Rs.${newPriceValue} / gram`);
      setCurrentChange(newChange);
      
      const now = new Date();
      let hours = now.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      
      setUpdatedAt(`${hours}:${minutes}:${seconds} ${ampm}`);
      setCountdown(300); // Reset countdown on price update

      // Flash highlight to show update
      setHighlight(true);
      setTimeout(() => setHighlight(false), 500);

    }, 5000); // Update every 5 seconds (Reduced from 5min for demo, but kept timer logic)

    return () => clearInterval(interval);
  }, [enableLiveGoldRate]);

  // Real countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isPositiveChange = currentChange.startsWith('+');

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, highlight && styles.containerHighlight]}>
        <View style={styles.headerRow}>
          <View style={styles.liveIndicatorContainer}>
            <View style={styles.liveDot} />
            <Text style={styles.title}>{data.title}</Text>
          </View>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>24K • 99.9%</Text>
          </View>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{currentPrice}</Text>
          <View style={[styles.changeContainer, isPositiveChange ? styles.positiveChange : styles.negativeChange]}>
            <Text style={[styles.changeText, isPositiveChange ? styles.positiveText : styles.negativeText]}>
              {currentChange}
            </Text>
          </View>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.updatedAt}>Price will refresh in {formatCountdown(countdown)} (Last updated {updatedAt})</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{data.cta_text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
  },
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  containerHighlight: {
    borderColor: theme.colors.primary,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  liveIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.danger,
    marginRight: theme.spacing.xs,
  },
  title: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  badgeContainer: {
    backgroundColor: 'rgba(200, 150, 12, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.s,
    borderWidth: 1,
    borderColor: 'rgba(200, 150, 12, 0.3)',
  },
  badgeText: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginRight: theme.spacing.s,
  },
  changeContainer: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  positiveChange: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  negativeChange: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  changeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  positiveText: {
    color: theme.colors.success,
  },
  negativeText: {
    color: theme.colors.danger,
  },
  footerRow: {
    marginBottom: theme.spacing.m,
  },
  updatedAt: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
