import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../constants/ThemeContext';

interface NavItem {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  route: string;
}

const navItems: NavItem[] = [
  { icon: 'home', label: 'HOME', route: '/(tabs)' },
  { icon: 'add-circle', label: 'ADD', route: '/(tabs)/add-vehicle' },
  { icon: 'search', label: 'SCAN', route: '/(tabs)/scan' },
  { icon: 'time', label: 'HISTORY', route: '/(tabs)/history' },
];

export const BottomNav = () => {
  const { colors } = useTheme();
  const pathname = usePathname();

  const isActive = (route: string) => {
    if (route === '/(tabs)' && pathname === '/(tabs)') return true;
    if (route !== '/(tabs)' && pathname.includes(route.replace('/(tabs)/', ''))) return true;
    return false;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bottomNavBg }]}>
      {navItems.map((item) => {
        const active = isActive(item.route);
        return (
          <TouchableOpacity
            key={item.label}
            style={[styles.navItem, active && { backgroundColor: 'rgba(108, 92, 231, 0.15)' }]}
            onPress={() => router.push(item.route)}
          >
            <Ionicons 
              name={active ? item.icon : `${item.icon}-outline` as any} 
              size={22} 
              color={active ? colors.borderPrimary : colors.bottomNavInactive} 
            />
            <Text style={[styles.navLabel, { 
              color: active ? colors.borderPrimary : colors.bottomNavInactive 
            }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 8,
    paddingBottom: 12,
    borderTopWidth: 2,
    borderTopColor: '#6c5ce7',
    height: 70,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  navLabel: {
    fontFamily: 'Orbitron',
    fontSize: 11,
    textTransform: 'uppercase',
  },
});