import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../utils/theme';

interface InvestmentCard {
  title: string;
  description: string;
  icon: string;
  cta: string;
}

interface InvestmentCardsProps {
  data: {
    items: InvestmentCard[];
  };
}

export const InvestmentCards: React.FC<InvestmentCardsProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Investment Options</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {data.items.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <View style={styles.iconContainer}>
              <Image source={{ uri: item.icon }} style={styles.icon} />
            </View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription} numberOfLines={2}>{item.description}</Text>
            <Text style={styles.cardCta}>{item.cta} {'→'}</Text>
          </TouchableOpacity>
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
    paddingHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.s,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.m,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginRight: theme.spacing.m,
    width: 160,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.s,
    backgroundColor: 'rgba(200, 150, 12, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: theme.colors.primary,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  cardDescription: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.m,
  },
  cardCta: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginTop: 'auto',
  },
});
