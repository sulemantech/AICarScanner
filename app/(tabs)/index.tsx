import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertBanner } from '../../components/ui/AlertBanner';
import { BottomNav } from '../../components/ui/BottomNav';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { ComponentCard } from '../../components/vehicle/ComponentCard';
import { HealthScore } from '../../components/vehicle/HealthScore';
import { useTheme } from '../../constants/ThemeContext';

export default function DashboardScreen() {
  const { colors } = useTheme();

  const handleComponentPress = (component: string) => {
    if (component === 'BRAKES') {
      router.push('/issue-details');
    }
  };

  return (
     <SafeAreaView style={[styles.container, { backgroundColor: colors.bgBody }]}>
    <View style={[styles.container, { backgroundColor: colors.bgBody }]}>
      <View style={[styles.screen, { backgroundColor: colors.screenBg }]}>
        {/* Removed StatusBar - using device's native status bar */}
        <ScreenHeader title="DASHBOARD" showBack={false} />

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <HealthScore score={82} lastScan="10:23" />

          <AlertBanner 
            count={3}
            systems={['Battery', 'Brakes', 'TPMS']}
            onPress={() => router.push('/(tabs)/alerts')}
          />

          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            SYSTEM STATUS
          </Text>

          <View style={styles.grid}>
            <ComponentCard 
              name="ENGINE" 
              status="good" 
              value="98%"
              onPress={() => handleComponentPress('ENGINE')}
            />
            <ComponentCard 
              name="BRAKES" 
              status="warning" 
              value="40%"
              onPress={() => handleComponentPress('BRAKES')}
            />
            <ComponentCard 
              name="BATTERY" 
              status="good" 
              value="12.4V"
              onPress={() => handleComponentPress('BATTERY')}
            />
            <ComponentCard 
              name="TRANSMISSION" 
              status="good"
              onPress={() => handleComponentPress('TRANSMISSION')}
            />
          </View>

          <TouchableOpacity 
            style={[styles.primaryButton, { borderColor: colors.borderPrimary }]}
            onPress={() => router.push('/(tabs)/scan')}
          >
            <Ionicons name="search" size={18} color={colors.borderPrimary} />
            <Text style={[styles.primaryButtonText, { color: colors.borderPrimary }]}>
              START DIAGNOSTIC
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
  style={[styles.primaryButton, { borderColor: colors.borderPrimary }]}
  onPress={() => router.push('/(tabs)/diagnostics')} // ← Now goes to Diagnostics
>
  <Ionicons name="search" size={18} color={colors.borderPrimary} />
  <Text style={[styles.primaryButtonText, { color: colors.borderPrimary }]}>
    VIEW DTC CODES
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 12,
    letterSpacing: 1,
  },
  grid: {
    gap: 14,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 2,
    borderRadius: 60,
    padding: 18,
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