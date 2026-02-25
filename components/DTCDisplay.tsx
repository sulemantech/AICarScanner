// components/DTCDisplay.tsx
import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../constants/ThemeContext';
import { getDTCDefinition, getDTCSeverity } from '../services/DTCDatabase';
import { DTC } from '../types/dtc.types';

interface DTCDisplayProps {
  dtcCode: string;
  showLocation?: boolean;
  onPress?: (dtc: DTC) => void;
  compact?: boolean;
}

// Use memo to prevent unnecessary re-renders
export const DTCDisplay = memo(({ 
  dtcCode, 
  showLocation = true, 
  onPress,
  compact = false 
}: DTCDisplayProps) => {
  const { colors } = useTheme();
  const dtc = getDTCDefinition(dtcCode);
  const severity = getDTCSeverity(dtcCode);

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'critical':
        return colors.accentRed;
      case 'warning':
        return colors.accentAmber;
      case 'info':
      default:
        return colors.accentGreen;
    }
  };

  const severityColor = getSeverityColor(severity);

  const handlePress = () => {
    if (onPress) {
      onPress(dtc);
    }
  };

  if (compact) {
    return (
      <TouchableOpacity 
        style={[styles.compactContainer, { 
          backgroundColor: colors.cardBg,
          borderLeftColor: severityColor,
        }]}
        onPress={handlePress}
        disabled={!onPress}
        activeOpacity={onPress ? 0.7 : 1}
      >
        <Text style={[styles.compactCode, { color: colors.textPrimary }]}>
          {dtc.code}
        </Text>
        <Text 
          style={[styles.compactDescription, { color: colors.textSecondary }]}
          numberOfLines={1}
        >
          {dtc.description}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={[styles.container, { 
        backgroundColor: colors.cardBg,
        borderColor: severityColor,
      }]}
      onPress={handlePress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.header}>
        <View style={styles.codeContainer}>
          <Text style={[styles.code, { color: colors.textPrimary }]}>
            {dtc.code}
          </Text>
          <View style={[styles.severityBadge, { backgroundColor: severityColor }]}>
            <Text style={styles.severityText}>
              {severity.toUpperCase()}
            </Text>
          </View>
        </View>
        {dtc.location && showLocation && (
          <Text style={[styles.location, { color: colors.textSecondary }]}>
            {dtc.location}
          </Text>
        )}
      </View>
      
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        {dtc.description}
      </Text>
    </TouchableOpacity>
  );
});

// Add display name for debugging
DTCDisplay.displayName = 'DTCDisplay';

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    borderWidth: 2,
    borderLeftWidth: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  code: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  severityText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  // Compact styles
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 4,
    borderLeftWidth: 4,
    borderRadius: 8,
  },
  compactCode: {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    width: 60,
  },
  compactDescription: {
    fontSize: 13,
    flex: 1,
    marginLeft: 8,
  },
});