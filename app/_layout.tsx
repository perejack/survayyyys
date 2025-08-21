import { useCallback, useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import { StatusBar } from 'expo-status-bar';
import { View, Platform } from 'react-native';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as ExpoSplashScreen from 'expo-splash-screen';
// Import correctly from authStore
import { useAuthStore } from '@/stores/authStore';
import CustomSplashScreen from '@/components/SplashScreen';
import { AuthProvider } from '@/context/AuthProvider';

// Keep the splash screen visible until fonts are loaded
ExpoSplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();
  // Get authentication state from the store
  const { isAuthenticated } = useAuthStore();
  const [isCustomSplashVisible, setIsCustomSplashVisible] = useState(true);

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium, 
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      onLayoutRootView();
    }
  }, [fontsLoaded, fontError, onLayoutRootView]);

  const handleSplashFinish = () => {
    setIsCustomSplashVisible(false);
  };

  // Return null to keep expo splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Return our custom animated splash screen after fonts load
  if (isCustomSplashVisible) {
    return <CustomSplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17461418440"></script>
          <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17486244338"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', 'AW-17461418440');
                gtag('config', 'AW-17461126438');
                gtag('config', 'AW-17486244338');
              `,
            }}
          />
        </Head>
      )}

      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="splash" options={{ animation: 'fade' }} />
          <Stack.Screen name="auth" options={{ animation: 'fade' }} />
          <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
          <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
          <Stack.Screen name="survey" options={{ animation: 'fade' }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </AuthProvider>
    </>
  );
}