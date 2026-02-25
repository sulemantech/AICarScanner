import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomNav } from '../../components/ui/BottomNav';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { useTheme } from '../../constants/ThemeContext';

export default function ProfileScreen() {
  const { colors, theme, toggleTheme, isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgBody }]}>
      <View style={[styles.screen, { backgroundColor: colors.screenBg }]}>
        <ScreenHeader title="PROFILE" />

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Profile Header */}
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

          {/* Theme Toggle Card */}
          <TouchableOpacity 
            style={[styles.themeCard, { 
              backgroundColor: colors.cardBg,
              borderColor: colors.borderPrimary 
            }]}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <View style={styles.themeCardContent}>
              <View style={styles.themeIconContainer}>
                <Ionicons 
                  name={isDark ? "moon" : "sunny"} 
                  size={24} 
                  color={colors.borderPrimary} 
                />
              </View>
              <View style={styles.themeTextContainer}>
                <Text style={[styles.themeTitle, { color: colors.textPrimary }]}>
                  Theme Mode
                </Text>
                <Text style={[styles.themeSubtitle, { color: colors.textSecondary }]}>
                  Tap to switch to {isDark ? 'light' : 'dark'} mode
                </Text>
              </View>
              <View style={[styles.themeBadge, { backgroundColor: colors.borderPrimary }]}>
                <Text style={styles.themeBadgeText}>
                  {isDark ? 'DARK' : 'LIGHT'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Settings List */}
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

          {/* Sign Out Button */}
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
  // Theme Card Styles
  themeCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  themeCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  themeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(108, 92, 231, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeTextContainer: {
    flex: 1,
  },
  themeTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  themeSubtitle: {
    fontSize: 13,
  },
  themeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  themeBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  settingsList: {
    gap: 14,
    marginVertical: 16,
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