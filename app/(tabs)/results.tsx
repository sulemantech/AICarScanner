import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../../components/ui/BottomNav';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { ComponentCard } from '../../components/vehicle/ComponentCard';
import { useTheme } from '../../constants/ThemeContext';

export default function ResultsScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgBody }]}>
    <View style={[styles.container, { backgroundColor: colors.bgBody }]}>
      <View style={[styles.screen, { backgroundColor: colors.screenBg }]}>
        {/* Removed StatusBar - using device's native status bar */}
        <ScreenHeader title="SCAN RESULTS" />

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={[styles.summaryCard, { 
            backgroundColor: colors.cardBg,
            borderColor: colors.borderPrimary 
          }]}>
            <Text style={[styles.summaryText, { color: colors.textSecondary }]}>
              Issues Found: <Text style={[styles.bold, { color: colors.textPrimary }]}>2</Text>
            </Text>
            <Text style={[styles.summaryText, { color: colors.textSecondary }]}>
              Systems Checked: <Text style={[styles.bold, { color: colors.textPrimary }]}>12</Text>
            </Text>
            <Text style={[styles.summaryText, { color: colors.textSecondary }]}>
              Critical Issues: <Text style={[styles.bold, { color: colors.accentGreen }]}>0</Text>
            </Text>
          </View>

          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            SYSTEM STATUS
          </Text>

          <View style={styles.grid}>
            <ComponentCard name="ENGINE" status="good" />
            <ComponentCard 
              name="BRAKES" 
              status="warning" 
              onPress={() => router.push('/issue-details')}
            />
            <ComponentCard name="BATTERY" status="good" />
            <ComponentCard name="TRANSMISSION" status="good" />
            <ComponentCard name="SENSORS" status="warning" />
          </View>

          <TouchableOpacity 
            style={[styles.primaryButton, { borderColor: colors.borderPrimary }]}
            onPress={() => router.push('/(tabs)/alerts')}
          >
            <Text style={[styles.primaryButtonText, { color: colors.borderPrimary }]}>
              VIEW RECOMMENDATIONS
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
  summaryCard: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  summaryText: {
    fontSize: 16,
    marginVertical: 4,
  },
  bold: {
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: 1,
  },
  grid: {
    gap: 14,
  },
  primaryButton: {
    borderWidth: 2,
    borderRadius: 60,
    padding: 18,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
  },
});