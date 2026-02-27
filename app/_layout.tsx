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
    'Orbitron-Regular': require('../assets/fonts/Orbitron-Regular.ttf'),
    'Orbitron': require('../assets/fonts/Orbitron-Bold.ttf'),
    'Rajdhani-Medium': require('../assets/fonts/Rajdhani-Medium.ttf'),
    'Rajdhani-Regular': require('../assets/fonts/Rajdhani-Regular.ttf'),
    'Rajdhani': require('../assets/fonts/Rajdhani-Bold.ttf'),
    // Avoid duplicates or extra requirements if possible
  });

  useEffect(() => {
    // 1. Safety Timeout: If nothing happens in 5 seconds, hide the splash anyway
    const timeout = setTimeout(() => {
      SplashScreen.hideAsync().catch(() => {});
    }, 5000);

    // 2. Hide when ready
    if (loaded || error) {
      SplashScreen.hideAsync()
        .then(() => clearTimeout(timeout))
        .catch((e) => console.warn(e));
    }

    return () => clearTimeout(timeout);
  }, [loaded, error]);

  // IMPORTANT: Don't return null if there's an error. 
  // Show the UI so you can at least see a potential RedBox or Error.
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