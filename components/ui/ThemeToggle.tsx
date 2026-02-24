import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../constants/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme, colors, isDark } = useTheme();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleTheme();
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { 
        backgroundColor: colors.screenBg,
        borderColor: colors.borderPrimary,
      }]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Ionicons 
        name={isDark ? 'sunny' : 'moon'} 
        size={24} 
        color={colors.borderPrimary} 
      />
      <Text style={[styles.text, { color: colors.textPrimary }]}>
        {isDark ? 'LIGHT MODE' : 'DARK MODE'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    borderWidth: 2,
    borderRadius: 60,
    paddingVertical: 8,
    paddingHorizontal: 20,
    shadowColor: '#6c5ce7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 10,
  },
  text: {
    fontFamily: 'Orbitron',
    fontWeight: '700',
    fontSize: 14,
  },
});