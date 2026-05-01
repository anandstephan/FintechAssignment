import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { theme } from '../utils/theme';

interface FormField {
  type: string;
  label: string;
  placeholder?: string;
  options?: string[];
}

interface DynamicFormProps {
  data: {
    title: string;
    fields: FormField[];
    cta: string;
  };
}

export const DynamicForm: React.FC<DynamicFormProps> = ({ data }) => {
  const [formValues, setFormValues] = React.useState<Record<string, string>>({});
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      
      {data.fields.map((field, index) => (
        <View key={index} style={styles.fieldContainer}>
          <Text style={styles.label}>{field.label}</Text>
          
          {field.type === 'input' && (
            <TextInput
              style={styles.input}
              placeholder={field.placeholder}
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
            />
          )}
          
          {field.type === 'dropdown' && (
            <View style={{ zIndex: openDropdown === field.label ? 1000 : 1 }}>
              <TouchableOpacity 
                style={styles.dropdown}
                onPress={() => setOpenDropdown(openDropdown === field.label ? null : field.label)}
              >
                <Text style={styles.dropdownText}>
                  {formValues[field.label] || (field.options ? field.options[0] : 'Select')}
                </Text>
                <Text style={styles.dropdownIcon}>{openDropdown === field.label ? '▲' : '▼'}</Text>
              </TouchableOpacity>
              
              {openDropdown === field.label && field.options && (
                <View style={styles.dropdownList}>
                  {field.options.map((opt, i) => (
                    <TouchableOpacity 
                      key={i} 
                      style={styles.dropdownItem}
                      onPress={() => {
                        setFormValues(prev => ({ ...prev, [field.label]: opt }));
                        setOpenDropdown(null);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{data.cta}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.m,
    marginVertical: theme.spacing.m,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.l,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  fieldContainer: {
    marginBottom: theme.spacing.m,
  },
  label: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.s,
  },
  input: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.s,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.m,
    color: theme.colors.text,
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.s,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    color: theme.colors.text,
    fontSize: 16,
  },
  dropdownIcon: {
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  dropdownList: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.s,
    marginTop: 4,
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dropdownItem: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  dropdownItemText: {
    color: theme.colors.text,
    fontSize: 16,
  },
  button: {
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    paddingVertical: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    alignItems: 'center',
    marginTop: theme.spacing.s,
  },
  buttonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
