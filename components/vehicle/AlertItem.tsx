import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../constants/ThemeContext';

interface AlertItemProps {
  title: string;
  description: string;
  severity: 'critical' | 'warning' | 'info';
  detected: string;
  onPress?: () => void;
}

export const AlertItem = ({ title, description, severity, detected, onPress }: AlertItemProps) => {
  const { colors } = useTheme();

  const severityColor = {
    critical: colors.accentRed,
    warning: colors.accentAmber,
    info: colors.borderPrimary,
  }[severity];

  return (
    <TouchableOpacity 
      style={[styles.container, { 
        backgroundColor: colors.cardBg,
        borderLeftColor: severityColor,
        borderColor: colors.borderPrimary 
      }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
        <Text style={[styles.severity, { color: severityColor }]}>
          {severity.toUpperCase()}
        </Text>
      </View>
      <Text style={[styles.description, { color: colors.textSecondary }]}>{description}</Text>
      <Text style={[styles.detected, { color: colors.borderPrimary }]}>
        Detected: {detected}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 16,
    borderLeftWidth: 6,
    borderWidth: 1,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  severity: {
    fontSize: 12,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    marginVertical: 4,
  },
  detected: {
    fontSize: 12,
  },
});