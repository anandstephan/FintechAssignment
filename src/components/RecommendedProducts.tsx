import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../utils/theme';

interface ProductItem {
  id: string;
  title: string;
  image: string;
  returns: string;
  risk: string;
  cta: string;
}

interface RecommendedProductsProps {
  data: {
    items: ProductItem[];
  };
}

export const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recommended Products</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {data.items.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{item.title}</Text>
              
              <View style={styles.infoRow}>
                <View>
                  <Text style={styles.label}>Returns</Text>
                  <Text style={styles.value}>{item.returns}</Text>
                </View>
                <View style={styles.riskBadge}>
                  <Text style={styles.riskText}>{item.risk}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{item.cta}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.m,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginLeft: theme.spacing.m,
    marginBottom: theme.spacing.m,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.m,
    gap: theme.spacing.m,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    width: 280,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
    marginRight: theme.spacing.m,
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: theme.colors.border,
  },
  cardContent: {
    padding: theme.spacing.m,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  label: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.success,
  },
  riskBadge: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  riskText: {
    fontSize: 12,
    color: theme.colors.danger,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'rgba(200, 150, 12, 0.1)',
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.s,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(200, 150, 12, 0.3)',
  },
  buttonText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});
