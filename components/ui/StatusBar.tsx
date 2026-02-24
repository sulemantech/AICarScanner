import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../constants/ThemeContext';

interface StatusBarProps {
  time?: string;
  alertCount?: number;
}

export const StatusBar = ({ time = '21:37', alertCount = 3 }: StatusBarProps) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { borderBottomColor: colors.borderDim }]}>
      <Text style={[styles.time, { color: colors.textSecondary }]}>{time}</Text>
      <View style={styles.rightIcons}>
        <Ionicons name="cellular" size={16} color={colors.textSecondary} />
        <Ionicons name="wifi" size={16} color={colors.textSecondary} />
        <Ionicons name="battery-full" size={16} color={colors.textSecondary} />
        <View style={styles.notificationBadge}>
          <Ionicons name="notifications" size={18} color={colors.textSecondary} />
          {alertCount > 0 && (
            <View style={[styles.alertDot, { backgroundColor: colors.alertDot }]}>
              <Text style={styles.alertCount}>{alertCount}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderBottomWidth: 1,
  },
  time: {
    fontFamily: 'Orbitron',
    fontSize: 14,
  },
  rightIcons: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'relative',
    marginLeft: 4,
  },
  alertDot: {
    position: 'absolute',
    top: -6,
    right: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertCount: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
});