import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../constants/ThemeContext';

interface ComponentCardProps {
  name: string;
  status: 'good' | 'warning' | 'critical';
  value?: string;
  onPress?: () => void;
}

export const ComponentCard = ({ name, status, value, onPress }: ComponentCardProps) => {
  const { colors } = useTheme();

  const statusColor = {
    good: colors.accentGreen,
    warning: colors.accentAmber,
    critical: colors.accentRed,
  }[status];

  return (
    <TouchableOpacity 
      style={[styles.container, { 
        backgroundColor: colors.cardBg,
        borderColor: colors.borderPrimary 
      }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftContent}>
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        <Text style={[styles.name, { color: colors.textPrimary }]}>{name}</Text>
      </View>
      {value && (
        <Text style={[styles.value, { color: colors.textSecondary }]}>{value}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 14,
  },
});