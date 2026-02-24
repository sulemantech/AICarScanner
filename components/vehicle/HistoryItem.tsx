import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../constants/ThemeContext';

interface HistoryItemProps {
  date: string;
  status: 'good' | 'warning' | 'critical';
  label: string;
  onPress?: () => void;
}

export const HistoryItem = ({ date, status, label, onPress }: HistoryItemProps) => {
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
      <Text style={[styles.date, { color: colors.textPrimary }]}>{date}</Text>
      <Text style={[styles.status, { color: statusColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    fontWeight: '500',
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
});