import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../../components/ui/BottomNav';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { useTheme } from '../../constants/ThemeContext';
export default function ProfileScreen() {
  const { colors } = useTheme();

  return (
     <SafeAreaView style={[styles.container, { backgroundColor: colors.bgBody }]}>
    <View style={[styles.container, { backgroundColor: colors.bgBody }]}>
      <View style={[styles.screen, { backgroundColor: colors.screenBg }]}>
        {/* Removed StatusBar - using device's native status bar */}
        <ScreenHeader title="PROFILE" />

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.profileHeader}>
            <View style={[styles.avatar, { 
              backgroundColor: colors.cardBg,
              borderColor: colors.borderPrimary 
            }]}>
              <Ionicons name="person-circle" size={48} color={colors.borderPrimary} />
            </View>
            <View>
              <Text style={[styles.userName, { color: colors.textPrimary }]}>
                ALEX RIVERA
              </Text>
              <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
                alex@neodrive.com
              </Text>
            </View>
          </View>

          <View style={styles.settingsList}>
            <TouchableOpacity style={[styles.settingItem, { 
              backgroundColor: colors.cardBg,
              borderColor: colors.borderPrimary 
            }]}>
              <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>
                <Ionicons name="car" size={16} /> MY VEHICLES
              </Text>
              <Text style={[styles.settingValue, { color: colors.textPrimary }]}>2</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.settingItem, { 
              backgroundColor: colors.cardBg,
              borderColor: colors.borderPrimary 
            }]}>
              <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>
                <Ionicons name="bluetooth" size={16} /> CONNECTED DEVICES
              </Text>
              <Text style={[styles.settingValue, { color: colors.textPrimary }]}>1</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.settingItem, { 
              backgroundColor: colors.cardBg,
              borderColor: colors.borderPrimary 
            }]}>
              <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>
                <Ionicons name="notifications" size={16} /> NOTIFICATIONS
              </Text>
              <Text style={[styles.settingValue, { color: colors.textPrimary }]}>ON</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.settingItem, { 
              backgroundColor: colors.cardBg,
              borderColor: colors.borderPrimary 
            }]}>
              <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>
                <Ionicons name="shield" size={16} /> PRIVACY SETTINGS
              </Text>
              <Ionicons name="chevron-forward" size={16} color={colors.textPrimary} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.settingItem, { 
              backgroundColor: colors.cardBg,
              borderColor: colors.borderPrimary 
            }]}>
              <Text style={[styles.settingLabel, { color: colors.textPrimary }]}>
                <Ionicons name="headset" size={16} /> SUPPORT
              </Text>
              <Ionicons name="chevron-forward" size={16} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.outlineButton, { borderColor: colors.accentGreen }]}
            onPress={() => router.push('/')}
          >
            <Text style={[styles.outlineButtonText, { color: colors.accentGreen }]}>
              SIGN OUT
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
  profileHeader: {
    flexDirection: 'row',
    gap: 18,
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 15,
  },
  settingsList: {
    gap: 14,
    marginVertical: 24,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  settingValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  outlineButton: {
    borderWidth: 1,
    borderRadius: 40,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20,
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});