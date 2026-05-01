import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Skeleton } from './Skeleton';
import { theme } from '../utils/theme';

export const DashboardSkeleton = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Skeleton */}
      <View style={styles.header}>
        <View style={styles.row}>
          <Skeleton width={48} height={48} borderRadius={24} />
          <View style={styles.headerText}>
            <Skeleton width={80} height={12} style={{ marginBottom: 6 }} />
            <Skeleton width={120} height={18} />
          </View>
        </View>
        <Skeleton width={40} height={40} borderRadius={20} />
      </View>

      {/* Gold Rate Banner Skeleton */}
      <View style={styles.section}>
        <Skeleton width="100%" height={200} borderRadius={theme.borderRadius.l} />
      </View>

      {/* Investment Options Title Skeleton */}
      <View style={styles.section}>
        <Skeleton width={150} height={20} style={{ marginBottom: theme.spacing.m }} />
        <View style={styles.horizontalRow}>
          <Skeleton width={160} height={180} borderRadius={theme.borderRadius.m} style={{ marginRight: theme.spacing.m }} />
          <Skeleton width={160} height={180} borderRadius={theme.borderRadius.m} />
        </View>
      </View>

      {/* Banner Carousel Skeleton */}
      <View style={styles.section}>
        <Skeleton width="100%" height={180} borderRadius={theme.borderRadius.m} />
      </View>

      {/* Recommended Products Skeleton */}
      <View style={styles.section}>
        <Skeleton width={180} height={20} style={{ marginBottom: theme.spacing.m }} />
        <View style={styles.horizontalRow}>
          <Skeleton width={140} height={220} borderRadius={theme.borderRadius.m} style={{ marginRight: theme.spacing.m }} />
          <Skeleton width={140} height={220} borderRadius={theme.borderRadius.m} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    paddingTop: theme.spacing.s,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: theme.spacing.m,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  horizontalRow: {
    flexDirection: 'row',
  },
});
