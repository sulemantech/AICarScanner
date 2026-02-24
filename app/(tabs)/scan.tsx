import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../../components/ui/BottomNav';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { useTheme } from '../../constants/ThemeContext';

export default function ScanScreen() {
  const { colors } = useTheme();
  const [progress, setProgress] = useState(65);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            router.push('/(tabs)/results');
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
     <SafeAreaView style={[styles.container, { backgroundColor: colors.bgBody }]}>
    <View style={[styles.container, { backgroundColor: colors.bgBody }]}>
      <View style={[styles.screen, { backgroundColor: colors.screenBg }]}>
        {/* Removed StatusBar - using device's native status bar */}
        <ScreenHeader title="DIAGNOSTIC" />

        <ScrollView contentContainerStyle={styles.content}>
          <View style={[styles.radarContainer, { borderColor: colors.borderPrimary }]}>
            <View style={[styles.radar, { borderColor: colors.borderPrimary }]}>
              <View style={[styles.radarInner, { borderColor: colors.borderPrimary }]} />
              <Ionicons name="car" size={48} color={colors.borderPrimary} />
            </View>
          </View>

          <Text style={[styles.scanningText, { color: colors.textPrimary }]}>
            SCANNING SYSTEMS
          </Text>

          <View style={[styles.progressContainer, { borderColor: colors.borderPrimary }]}>
            <View style={[styles.progressBar, { width: `${progress}%`, backgroundColor: colors.borderPrimary }]} />
          </View>

          <Text style={[styles.systemsText, { color: colors.textSecondary }]}>
            Engine · Brakes · Battery · Sensors
          </Text>

          {progress < 100 && (
            <ActivityIndicator size="large" color={colors.borderPrimary} style={styles.spinner} />
          )}

          <TouchableOpacity 
            style={[styles.cancelButton, { borderColor: colors.accentGreen }]}
            onPress={() => router.back()}
          >
            <Text style={[styles.cancelButtonText, { color: colors.accentGreen }]}>
              CANCEL
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
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 4,
    borderTopColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarInner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  scanningText: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    letterSpacing: 1,
  },
  progressContainer: {
    width: '100%',
    height: 10,
    borderWidth: 1,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
  },
  systemsText: {
    fontSize: 15,
    marginBottom: 30,
  },
  spinner: {
    marginVertical: 24,
  },
  cancelButton: {
    borderWidth: 1,
    borderRadius: 40,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});