import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../constants/ThemeContext';

interface HealthScoreProps {
  score: number;
  lastScan: string;
}

export const HealthScore = ({ score = 82, lastScan = '10:23' }: HealthScoreProps) => {
  const { colors } = useTheme();

  // Calculate conic gradient angle (0-100 maps to 0-360 degrees)
  const angle = (score / 100) * 360;
  const isGood = score >= 70;
  const isWarning = score >= 40 && score < 70;
  const color = isGood ? colors.accentGreen : isWarning ? colors.accentAmber : colors.accentRed;

  return (
    <View style={[styles.container, { backgroundColor: colors.cardBg, borderColor: colors.borderPrimary }]}>
      <View style={[styles.gauge, { borderColor: color }]}>
        <View style={[styles.gaugeInner, { backgroundColor: colors.screenBg }]}>
          <Text style={[styles.score, { color: colors.textPrimary }]}>{score}</Text>
          <Text style={[styles.scoreLabel, { color: colors.textSecondary }]}>/100</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={[styles.healthLabel, { color: color }]}>VEHICLE HEALTH</Text>
        <Text style={[styles.lastScan, { color: colors.textSecondary }]}>Last scan: {lastScan}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
  },
  gauge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#6c5ce7',
  },
  score: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  scoreLabel: {
    fontSize: 12,
  },
  info: {
    flex: 1,
  },
  healthLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  lastScan: {
    fontSize: 14,
  },
});