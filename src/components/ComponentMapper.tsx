import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from './Header';
import { GoldRateBanner } from './GoldRateBanner';
import { InvestmentCards } from './InvestmentCards';
import { BannerCarousel } from './BannerCarousel';
import { DynamicForm } from './DynamicForm';
import { FaqSection } from './FaqSection';
import { StickyCta } from './StickyCta';
import { RecommendedProducts } from './RecommendedProducts';
import { theme } from '../utils/theme';

const FallbackComponent = ({ type }: { type: string }) => {
  return (
    <View style={styles.fallback}>
      <Text style={styles.fallbackText}>Unknown component: {type}</Text>
    </View>
  );
};

export const renderComponent = (component: any, index: number) => {
  const { type, data } = component;

  switch (type) {
    case 'header':
      return <Header key={`component-${index}`} data={data} />;
    case 'gold_rate_banner':
      return <GoldRateBanner key={`component-${index}`} data={data} />;
    case 'investment_cards':
      return <InvestmentCards key={`component-${index}`} data={data} />;
    case 'banner_carousel':
      return <BannerCarousel key={`component-${index}`} data={data} />;
    case 'dynamic_form':
      return <DynamicForm key={`component-${index}`} data={data} />;
    case 'faq_section':
      return <FaqSection key={`component-${index}`} data={data} />;
    case 'recommended_products':
      return <RecommendedProducts key={`component-${index}`} data={data} />;
    case 'sticky_cta':
      return <StickyCta key={`component-${index}`} data={data} />;
    default:
      // Graceful degradation for unknown components
      console.warn(`Unknown component type received: ${type}`);
      return null; // Return FallbackComponent({type}) if we want to show it in UI
  }
};

const styles = StyleSheet.create({
  fallback: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    marginVertical: theme.spacing.s,
    marginHorizontal: theme.spacing.m,
    borderRadius: theme.borderRadius.s,
    borderWidth: 1,
    borderColor: theme.colors.danger,
  },
  fallbackText: {
    color: theme.colors.danger,
    fontSize: 14,
  },
});

