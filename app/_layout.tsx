import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen'; // Updated import
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useTheme } from '../constants/ThemeContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { colors, isDark } = useTheme();

  return (
    <SafeAreaProvider>
      <StatusBar style={isDark ? 'light' : 'dark'} backgroundColor={colors.screenBg} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="issue-details" 
          options={{ headerShown: false, presentation: 'card' }} 
        />
        <Stack.Screen 
          name="modal" 
          options={{ presentation: 'modal', headerShown: false }} 
        />
      </Stack>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Orbitron': require('../assets/fonts/Orbitron-Regular.ttf'),
    'Orbitron-Bold': require('../assets/fonts/Orbitron-Bold.ttf'),
    'Orbitron-Regular': require('../assets/fonts/Orbitron-Regular.ttf'),
    'Rajdhani-Medium': require('../assets/fonts/Rajdhani-Medium.ttf'),
    'Rajdhani-Light': require('../assets/fonts/Rajdhani-Light.ttf'),
  });

  // Catch errors during font loading
  useEffect(() => {
    if (error) {
      console.error("Font Loading Error:", error);
    }
  }, [error]);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // If fonts aren't loaded and there's no error yet, keep showing Splash
  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <RootLayoutNav />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}