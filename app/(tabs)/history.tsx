import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../../components/ui/BottomNav';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { HistoryItem } from '../../components/vehicle/HistoryItem';
import { useTheme } from '../../constants/ThemeContext';

const historyData = [
  { date: '22 JAN 2026', status: 'good' as const, label: 'NO ISSUES' },
  { date: '10 JAN 2026', status: 'warning' as const, label: 'BRAKE WARNING' },
  { date: '28 DEC 2025', status: 'critical' as const, label: 'BATTERY LOW' },
  { date: '14 DEC 2025', status: 'good' as const, label: 'NO ISSUES' },
  { date: '01 DEC 2025', status: 'good' as const, label: 'NO ISSUES' },
];

export default function HistoryScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgBody }]}>
    <View style={[styles.container, { backgroundColor: colors.bgBody }]}>
      <View style={[styles.screen, { backgroundColor: colors.screenBg }]}>
        {/* Removed StatusBar - using device's native status bar */}
        <ScreenHeader title="HISTORY" />

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {historyData.map((item, index) => (
            <HistoryItem
              key={index}
              date={item.date}
              status={item.status}
              label={item.label}
            />
          ))}

          <TouchableOpacity 
            style={[styles.outlineButton, { borderColor: colors.accentGreen }]}
            onPress={() => {}}
          >
            <Text style={[styles.outlineButtonText, { color: colors.accentGreen }]}>
              LOAD MORE
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <BottomNav />
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 30,
  },
  outlineButton: {
    borderWidth: 1,
    borderRadius: 40,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20,
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});