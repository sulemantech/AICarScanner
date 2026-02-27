import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomNav } from '../../components/ui/BottomNav';
import { CustomDropdown } from '../../components/ui/CustomDropdown';
import { ScreenHeader } from '../../components/ui/ScreenHeader';
import { useTheme } from '../../constants/ThemeContext';
// Vehicle data
const vehicleMakes = [
  'BMW', 'Audi', 'Mercedes', 'Tesla', 'Porsche', 
  'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Volkswagen'
];

const vehicleModels: Record<string, string[]> = {
  BMW: ['X5', 'X3', '3 Series', '5 Series', '7 Series', 'M3'],
  Audi: ['A4', 'A6', 'Q5', 'Q7', 'e-tron', 'RS7'],
  Mercedes: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'EQS'],
  Tesla: ['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'],
  Porsche: ['911', 'Cayenne', 'Macan', 'Taycan', 'Panamera'],
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey'],
  Ford: ['F-150', 'Mustang', 'Explorer', 'Escape', 'Bronco'],
  Chevrolet: ['Silverado', 'Equinox', 'Tahoe', 'Camaro', 'Corvette'],
  Volkswagen: ['Golf', 'Jetta', 'Passat', 'Tiguan', 'Atlas'],
};

const years = ['2025', '2024', '2023', '2022', '2021', '2020'];

export default function AddVehicleScreen() {
  const { colors } = useTheme();
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [vin, setVin] = useState('');

  const models = make ? vehicleModels[make] || [] : [];

  return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.bgBody }]}>
    <View style={[styles.container, { backgroundColor: colors.bgBody }]}>
      <View style={[styles.screen, { backgroundColor: colors.screenBg }]}>
        {/* Removed StatusBar - using device's native status bar */}
        <ScreenHeader title="ADD VEHICLE" />

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={[styles.label, { color: colors.textPrimary }]}>
            VEHICLE DETAILS
          </Text>

          <CustomDropdown
            selected={make}
            options={vehicleMakes}
            placeholder="Make"
            onSelect={setMake}
          />

          <CustomDropdown
            selected={model}
            options={models}
            placeholder="Model"
            onSelect={setModel}
          />

          <CustomDropdown
            selected={year}
            options={years}
            placeholder="Year"
            onSelect={setYear}
          />

          <View style={[styles.vinContainer, { 
            backgroundColor: colors.cardBg,
            borderColor: colors.borderPrimary 
          }]}>
            <TextInput
              placeholder="VIN (optional)"
              placeholderTextColor={colors.textSecondary}
              value={vin}
              onChangeText={setVin}
              style={[styles.vinInput, { color: colors.textPrimary }]}
            />
          </View>

          <TouchableOpacity 
            style={[styles.primaryButton, { borderColor: colors.borderPrimary }]}
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={[styles.primaryButtonText, { color: colors.borderPrimary }]}>
              CONNECT VEHICLE
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
    gap: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Rajdhani',
    marginBottom: 4,
    letterSpacing: 1,
  },
  vinContainer: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 18,
    marginTop: 8,
  },
  vinInput: {
    fontSize: 16,
    padding: 0,
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