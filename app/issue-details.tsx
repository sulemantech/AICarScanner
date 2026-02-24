import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../components/ui/BottomNav';
import { ScreenHeader } from '../components/ui/ScreenHeader';
import { useTheme } from '../constants/ThemeContext';

export default function IssueDetailsScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgBody }]}>
    <View style={[styles.container, { backgroundColor: colors.bgBody }]}>
      <View style={[styles.screen, { backgroundColor: colors.screenBg }]}>
        {/* Removed StatusBar - using device's native status bar */}
        <ScreenHeader title="BRAKE SYSTEM" />

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.severityContainer}>
            <View style={[styles.severityBadge, { backgroundColor: colors.accentAmber }]}>
              <Text style={styles.severityText}>WARNING</Text>
            </View>
            <Text style={[styles.severityLevel, { color: colors.textSecondary }]}>
              Medium severity
            </Text>
          </View>

          <Text style={[styles.issueTitle, { color: colors.textPrimary }]}>
            Brake pad wear exceeds threshold
          </Text>

          <View style={[styles.recommendationCard, { 
            backgroundColor: colors.cardBg,
            borderColor: colors.borderPrimary 
          }]}>
            <Text style={[styles.recommendationTitle, { color: colors.borderPrimary }]}>
              RECOMMENDED ACTION
            </Text>
            <Text style={[styles.recommendationText, { color: colors.textSecondary }]}>
              Schedule service within the next 2 weeks. Current wear level at 40%.
            </Text>
          </View>

          <TouchableOpacity 
            style={[styles.primaryButton, { borderColor: colors.borderPrimary }]}
            onPress={() => {}}
          >
            <Text style={[styles.primaryButtonText, { color: colors.borderPrimary }]}>
              SCHEDULE SERVICE
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.outlineButton, { borderColor: colors.accentGreen }]}
            onPress={() => router.back()}
          >
            <Text style={[styles.outlineButtonText, { color: colors.accentGreen }]}>
              BACK TO RESULTS
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
  severityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  severityBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 40,
  },
  severityText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 14,
  },
  severityLevel: {
    fontSize: 15,
    fontWeight: '500',
  },
  issueTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
    lineHeight: 28,
  },
  recommendationCard: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    marginBottom: 24,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    letterSpacing: 1,
  },
  recommendationText: {
    fontSize: 15,
    lineHeight: 22,
  },
  primaryButton: {
    borderWidth: 2,
    borderRadius: 60,
    padding: 18,
    alignItems: 'center',
    marginVertical: 12,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2.5,
  },
  outlineButton: {
    borderWidth: 1,
    borderRadius: 40,
    padding: 16,
    alignItems: 'center',
    marginVertical: 8,
    marginBottom: 20,
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});