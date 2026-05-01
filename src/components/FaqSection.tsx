import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../utils/theme';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  data: {
    items: FaqItem[];
  };
}

export const FaqSection: React.FC<FaqSectionProps> = ({ data }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      
      {data.items.map((item, index) => {
        const isExpanded = expandedIndex === index;
        
        return (
          <View key={index} style={styles.faqItem}>
            <TouchableOpacity 
              style={styles.questionRow} 
              onPress={() => toggleExpand(index)}
              activeOpacity={0.7}
            >
              <Text style={styles.question}>{item.question}</Text>
              <Text style={styles.icon}>{isExpanded ? '−' : '+'}</Text>
            </TouchableOpacity>
            
            {isExpanded && (
              <View style={styles.answerContainer}>
                <Text style={styles.answer}>{item.answer}</Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.m,
    marginVertical: theme.spacing.m,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  faqItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.s,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.m,
  },
  question: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
    flex: 1,
  },
  icon: {
    fontSize: 20,
    color: theme.colors.primary,
    marginLeft: theme.spacing.m,
  },
  answerContainer: {
    paddingHorizontal: theme.spacing.m,
    paddingBottom: theme.spacing.m,
    paddingTop: 0,
  },
  answer: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
});
