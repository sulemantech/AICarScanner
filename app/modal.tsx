import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '../constants/ThemeContext';

export default function ModalScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
      <View style={[styles.modal, { backgroundColor: colors.screenBg }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Sign In</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Email</Text>
          <View style={[styles.input, { 
            backgroundColor: colors.cardBg,
            borderColor: colors.borderPrimary 
          }]}>
            <Text style={{ color: colors.textPrimary }}>alex@neodrive.com</Text>
          </View>

          <Text style={[styles.label, { color: colors.textSecondary }]}>Password</Text>
          <View style={[styles.input, { 
            backgroundColor: colors.cardBg,
            borderColor: colors.borderPrimary 
          }]}>
            <Text style={{ color: colors.textPrimary }}>••••••••</Text>
          </View>

          <TouchableOpacity style={[styles.button, { borderColor: colors.borderPrimary }]}>
            <Text style={[styles.buttonText, { color: colors.borderPrimary }]}>SIGN IN</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={[styles.link, { color: colors.accentGreen }]}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={[styles.link, { color: colors.borderPrimary }]}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    borderRadius: 24,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(108, 92, 231, 0.25)',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: -8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  button: {
    borderWidth: 2,
    borderRadius: 60,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  link: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
  },
});