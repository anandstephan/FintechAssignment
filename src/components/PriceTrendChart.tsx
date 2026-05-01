import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { theme } from '../utils/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 64;
const CHART_HEIGHT = 120;

interface PriceTrendChartProps {
  data: {
    title: string;
    ranges: string[];
  };
}

export const PriceTrendChart: React.FC<PriceTrendChartProps> = ({ data }) => {
  const [selectedRange, setSelectedRange] = useState('1M');

  // Simulated path for the chart (would be dynamic in production)
  const chartPath = "M0 80 Q 20 40, 40 60 T 80 30 T 120 50 T 160 20 T 200 40 T 240 10 T 280 30 T 320 50 L 320 120 L 0 120 Z";
  const linePath = "M0 80 Q 20 40, 40 60 T 80 30 T 120 50 T 160 20 T 200 40 T 240 10 T 280 30 T 320 50";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.priceInfo}>+5.2% this year</Text>
      </View>

      <View style={styles.chartWrapper}>
        <Svg width={CHART_WIDTH} height={CHART_HEIGHT} viewBox="0 0 320 120">
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={theme.colors.primary} stopOpacity="0.3" />
              <Stop offset="1" stopColor={theme.colors.primary} stopOpacity="0" />
            </LinearGradient>
          </Defs>
          
          <Path
            d={chartPath}
            fill="url(#grad)"
          />
          <Path
            d={linePath}
            fill="none"
            stroke={theme.colors.primary}
            strokeWidth="3"
          />
        </Svg>
      </View>

      <View style={styles.rangeSelector}>
        {data.ranges.map((range) => (
          <TouchableOpacity
            key={range}
            style={[styles.rangeButton, selectedRange === range && styles.activeRange]}
            onPress={() => setSelectedRange(range)}
          >
            <Text style={[styles.rangeText, selectedRange === range && styles.activeRangeText]}>
              {range}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.m,
    marginVertical: theme.spacing.s,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.l,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  title: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceInfo: {
    color: theme.colors.success,
    fontSize: 12,
    fontWeight: '600',
  },
  chartWrapper: {
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  rangeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: theme.borderRadius.m,
    padding: 4,
  },
  rangeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.m - 4,
  },
  activeRange: {
    backgroundColor: theme.colors.primary,
  },
  rangeText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeRangeText: {
    color: theme.colors.background,
  },
});
