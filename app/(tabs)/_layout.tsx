import { Tabs } from 'expo-router';
import { useTheme } from '../../constants/ThemeContext';

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, // We use custom BottomNav
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="add-vehicle" />
      <Tabs.Screen name="scan" />
      <Tabs.Screen name="results" />
      <Tabs.Screen name="alerts" />
      <Tabs.Screen name="history" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}