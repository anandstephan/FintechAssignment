import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../utils/theme';

const { width } = Dimensions.get('window');

interface BannerItem {
  image: string;
  redirect_url: string;
}

interface BannerCarouselProps {
  data: {
    items: BannerItem[];
  };
}

export const BannerCarousel: React.FC<BannerCarouselProps> = ({ data }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [imageErrors, setImageErrors] = React.useState<Record<number, boolean>>({});

  const fallbackImage = 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=800'; // Default reliable image as fallback

  // Auto-scroll logic
  useEffect(() => {
    if (data.items.length <= 1) return;
    
    const intervalId = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= data.items.length) {
        nextIndex = 0;
      }
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({ x: nextIndex * (width - theme.spacing.m * 2), animated: true });
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(intervalId);
  }, [currentIndex, data.items.length]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / (width - theme.spacing.m * 2));
          setCurrentIndex(newIndex);
        }}
      >
        {data.items.map((item, index) => (
          <TouchableOpacity key={index} activeOpacity={0.9} style={styles.imageContainer}>
            <Image 
              source={{ uri: imageErrors[index] ? fallbackImage : item.image }} 
              style={styles.image} 
              resizeMode="cover" 
              onError={() => setImageErrors(prev => ({ ...prev, [index]: true }))}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {data.items.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : null
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.m,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.m,
  },
  imageContainer: {
    width: width - theme.spacing.m * 2,
    height: 140,
    marginRight: theme.spacing.m, // Only visible if not pagingEnabled perfectly, but good for spacing
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.s,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.border,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: theme.colors.primary,
    width: 12,
  },
});
