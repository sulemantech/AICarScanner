import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../../components/ui/BottomNav';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { AlertItem } from '../../components/vehicle/AlertItem';
import { useTheme } from '../../constants/ThemeContext';

const alertsData = [
  {
    id: '1',
    title: 'LOW BATTERY VOLTAGE',
    description: '12.1V · Replace battery soon',
    severity: 'critical' as const,
    detected: 'Today, 08:23',
  },
  {
    id: '2',
    title: 'BRAKE WEAR',
    description: '40% remaining · Service in 2 weeks',
    severity: 'warning' as const,
    detected: 'Yesterday, 14:15',
  },
  {
    id: '3',
    title: 'TIRE PRESSURE LOW',
    description: 'Rear left: 28 PSI',
    severity: 'warning' as const,
    detected: '2 days ago',
  },
];

export default function AlertsScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgBody }]}>
    <View style={[styles.container, { backgroundColor: colors.bgBody }]}>
      <View style={[styles.screen, { backgroundColor: colors.screenBg }]}>
        {/* Removed StatusBar - using device's native status bar */}
        <ScreenHeader title="ACTIVE ALERTS" />

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            3 unresolved alerts
          </Text>

          {alertsData.map((alert) => (
            <AlertItem
              key={alert.id}
              title={alert.title}
              description={alert.description}
              severity={alert.severity}
              detected={alert.detected}
              onPress={() => {
                if (alert.title.includes('BRAKE')) {
                  router.push('/issue-details');
                }
              }}
            />
          ))}

          <TouchableOpacity 
            style={[styles.outlineButton, { borderColor: colors.accentGreen }]}
            onPress={() => {}}
          >
            <Text style={[styles.outlineButtonText, { color: colors.accentGreen }]}>
              ACKNOWLEDGE ALL
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
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: '500',
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