import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Colors, ColorScheme } from './Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the context type
interface ThemeContextType {
  theme: ColorScheme;
  colors: typeof Colors.dark;
  toggleTheme: () => void;
  isDark: boolean;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType | null>(null);

// Provider props type
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ColorScheme>('dark');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async (): Promise<void> => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async (): Promise<void> => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  const colors = theme === 'dark' ? Colors.dark : Colors.light;
  const isDark = theme === 'dark';

  // Don't render children until theme is loaded to prevent flash
  if (isLoading) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};