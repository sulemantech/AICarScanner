import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '../constants/ThemeContext';

export default function WelcomeScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.bgBody }]}>
      <View style={[styles.screen, { backgroundColor: colors.screenBg }]}>
        {/* Removed StatusBar component - using device's native status bar */}
        
        <View style={[styles.screenHeader, { borderBottomColor: colors.borderPrimary }]}>
          <View style={styles.placeholder} />
          <Text style={[styles.screenTitle, { color: colors.textPrimary }]}>
            WELCOME
          </Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <View style={[styles.illustration, { 
            backgroundColor: colors.cardBg,
            borderColor: colors.borderPrimary 
          }]}>
            {/* <Ionicons name="car-sport" size={72} color={colors.borderPrimary} /> */}
             <Image 
              source={require('../assets/images/welcome-car.png')}
              style={styles.carImage}
              resizeMode="contain"
            />
          </View>

          <Text style={[styles.mainTitle, { color: colors.textPrimary }]}>
            SMART VEHICLE HEALTH{'\n'}MONITORING
          </Text>
          
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Precision diagnostics · real‑time telemetry
          </Text>

          <TouchableOpacity 
            style={[styles.primaryButton, { borderColor: colors.borderPrimary }]}
            onPress={() => router.push('/(tabs)/add-vehicle')}
          >
            <Text style={[styles.primaryButtonText, { color: colors.borderPrimary }]}>
              GET STARTED
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.outlineButton, { borderColor: colors.accentGreen }]}
            onPress={() => router.push('/modal')}
          >
            <Text style={[styles.outlineButtonText, { color: colors.accentGreen }]}>
              SIGN IN
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  screenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 60, // Added paddingTop to push content below native status bar
    paddingBottom: 12,
    borderBottomWidth: 2,
  },
  screenTitle: {
    fontFamily: 'Orbitron',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 2,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    gap: 24,
  },
  illustration: {
    borderRadius: 28,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: 20,
  },
   carImage: {
    width: '80%',
    height: '80%',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  primaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 60,
    padding: 18,
    marginTop: 10,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
  },
  outlineButton: {
    borderWidth: 1,
    borderRadius: 40,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  outlineButtonText: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
});