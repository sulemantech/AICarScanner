import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../constants/ThemeContext';

interface ScreenHeaderProps {
  title: string;
  showBack?: boolean;
  showAvatar?: boolean;
  onAvatarPress?: () => void;
}

export const ScreenHeader = ({ 
  title, 
  showBack = true, 
  showAvatar = true,
  onAvatarPress 
}: ScreenHeaderProps) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { borderBottomColor: colors.borderPrimary }]}>
      {showBack ? (
        <TouchableOpacity 
          style={[styles.iconButton, { borderColor: colors.borderPrimary }]}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={20} color={colors.borderPrimary} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        {title}
      </Text>
      
      {showAvatar ? (
        <TouchableOpacity 
          style={[styles.avatarButton, { borderColor: colors.accentGreen }]}
          onPress={onAvatarPress || (() => router.push('/profile'))}
        >
          <Ionicons name="person" size={20} color={colors.accentGreen} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderBottomWidth: 2,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Orbitron',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 2,
  },
  placeholder: {
    width: 40,
  },
});