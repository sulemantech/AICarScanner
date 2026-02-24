import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useTheme } from '../../constants/ThemeContext'; // Add this import

export default function TabTwoScreen() {
  const { colors } = useTheme(); // Add this hook

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: colors.borderPrimary, dark: colors.surface }} // Use theme colors
      headerImage={
        <IconSymbol
          size={310}
          color={colors.borderPrimary} // Use theme color
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
            color: colors.textPrimary, // Ensure text uses theme color
          }}>
          Explore
        </ThemedText>
      </ThemedView>
      <ThemedText style={{ color: colors.textSecondary }}>This app includes example code to help you get started.</ThemedText>
      <Collapsible title="File-based routing">
        <ThemedText style={{ color: colors.textSecondary }}>
          This app has two screens:{' '}
          <ThemedText type="defaultSemiBold" style={{ color: colors.textPrimary }}>app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold" style={{ color: colors.textPrimary }}>app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText style={{ color: colors.textSecondary }}>
          The layout file in <ThemedText type="defaultSemiBold" style={{ color: colors.textPrimary }}>app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link" style={{ color: colors.borderPrimary }}>Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText style={{ color: colors.textSecondary }}>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold" style={{ color: colors.textPrimary }}>w</ThemedText> in the terminal running this project.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Images">
        <ThemedText style={{ color: colors.textSecondary }}>
          For static images, you can use the <ThemedText type="defaultSemiBold" style={{ color: colors.textPrimary }}>@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold" style={{ color: colors.textPrimary }}>@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link" style={{ color: colors.borderPrimary }}>Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Light and dark mode components">
        <ThemedText style={{ color: colors.textSecondary }}>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold" style={{ color: colors.textPrimary }}>useColorScheme()</ThemedText> hook lets you inspect
          what the user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link" style={{ color: colors.borderPrimary }}>Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText style={{ color: colors.textSecondary }}>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold" style={{ color: colors.textPrimary }}>components/HelloWave.tsx</ThemedText> component uses
          the powerful{' '}
          <ThemedText type="defaultSemiBold" style={{ fontFamily: Fonts.mono, color: colors.textPrimary }}>
            react-native-reanimated
          </ThemedText>{' '}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText style={{ color: colors.textSecondary }}>
              The <ThemedText type="defaultSemiBold" style={{ color: colors.textPrimary }}>components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});