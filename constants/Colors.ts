export type ColorScheme = 'dark' | 'light';

export const Colors = {
  // Dark mode (default)
  dark: {
    bgBody: '#080b12',
    screenBg: '#0a0520',
    screenBgSecondary: '#1a1040',
    textPrimary: '#ffffff',
    textSecondary: '#b2c6ff',
    borderPrimary: '#6c5ce7',
    borderDim: 'rgba(108, 92, 231, 0.25)',
    accentPrimary: '#6c5ce7',
    accentSecondary: '#8b7dd9',
    accentGreen: '#22c55e',
    accentAmber: '#f59e0b',
    accentRed: '#ef4444',
    cardBg: '#1b253f',
    dropdownBg: '#1e2a48',
    dropdownHover: '#2d3a60',
    bottomNavBg: 'rgba(10, 15, 30, 0.9)',
    bottomNavInactive: '#9aa9ce',
    alertDot: '#ef4444',
  },
  
  // Light mode (original preserved)
  light: {
    bgBody: '#eef4f9',
    screenBg: '#ffffff',
    screenBgSecondary: '#f5faff',
    textPrimary: '#102a3c',
    textSecondary: '#1f5570',
    borderPrimary: '#0077be',
    borderDim: 'rgba(0, 119, 190, 0.2)',
    accentPrimary: '#0077be',
    accentSecondary: '#00a1b0',
    accentGreen: '#00a86b',
    accentAmber: '#e68a00',
    accentRed: '#d14545',
    cardBg: '#e9f2f9',
    dropdownBg: '#f0f7fe',
    dropdownHover: '#d9e9ff',
    bottomNavBg: '#dae9f2',
    bottomNavInactive: '#3f6379',
    alertDot: '#d14545',
  },
} as const;