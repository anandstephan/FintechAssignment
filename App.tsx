import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { renderComponent } from './src/components/ComponentMapper';
import { mockResponse } from './src/mock/mockData';
import { theme } from './src/utils/theme';

import { LoginScreen } from './src/screens/LoginScreen';

function App() {
  const [screenData, setScreenData] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulate fetching data from backend
    setTimeout(() => {
      setScreenData(mockResponse.screen);
    }, 500); // 500ms mock delay
  }, []);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  if (!screenData) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
        <View style={styles.content}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {screenData.components.map((component: any, index: number) => {
            // Apply feature flags
            if (component.type === 'investment_cards' && !screenData.feature_flags.show_wallet_section) {
              return null;
            }
            if (component.type === 'recommended_products' && !screenData.feature_flags.show_recommendation_section) {
              return null;
            }
            if (component.type === 'sticky_cta') {
              return null;
            }

            return renderComponent(component, index);
          })}
        </ScrollView>
        {/* Render sticky CTA separately if it exists in components */}
        {screenData.components.map((component: any, index: number) => {
          if (component.type === 'sticky_cta') {
            return (
              <View key={`sticky-${index}`} style={styles.stickyContainer}>
                {renderComponent(component, index)}
              </View>
            );
          }
          return null;
        })}
      </View>
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    paddingBottom: 100, // Leave space for sticky CTA
  },
  stickyContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.m,
    paddingTop: theme.spacing.m,
    paddingBottom: theme.spacing.xl, // Safe area padding
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
});

export default App;
