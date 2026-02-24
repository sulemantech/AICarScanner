import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../constants/ThemeContext';

interface AlertBannerProps {
  count: number;
  systems: string[];
  onPress?: () => void;
}

export const AlertBanner = ({ count, systems, onPress }: AlertBannerProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.container, { 
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderColor: colors.accentRed 
      }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons name="warning" size={24} color={colors.accentRed} />
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.accentRed }]}>
          {count} Active {count === 1 ? 'Alert' : 'Alerts'}
        </Text>
        <Text style={[styles.systems, { color: colors.textSecondary }]}>
          {systems.join(' · ')}
        </Text>
      </View>
      <View style={[styles.badge, { backgroundColor: colors.accentRed }]}>
        <Text style={styles.badgeText}>{count}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    marginVertical: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 2,
  },
  systems: {
    fontSize: 14,
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
  },
});