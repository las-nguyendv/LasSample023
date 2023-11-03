/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { SWRConfig } from 'swr';

import { ThemeProvider } from '@rneui/themed';
import Toast from 'react-native-toast-message';
import AppNavigation from './src/navigation';
import { PlayingProvider } from './src/provider/PlayProvider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RealmProvider } from './src/provider/RealmProvider';
import { AdsProvider, AdsConfigType, AdsEnvs } from 'ads';
import { TestIds } from 'react-native-google-mobile-ads';

const env: Partial<AdsEnvs> = {
  GG_ID: 'ca-app-pub-2299291161271404~5584923659',
  GG_BANNER: __DEV__ ? TestIds.BANNER : 'ca-app-pub-2299291161271404/2845712691',
  GG_INTER: __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2299291161271404/1722496424',
  GG_INTER_SPLASH: __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2299291161271404/9409414750',
  GG_REWARD: __DEV__ ? TestIds.REWARDED : 'ca-app-pub-2299291161271404/2929473172',
  GG_NATIVE: __DEV__ ? '' : 'ca-app-pub-2299291161271404/9853974174',
  GG_APP_OPEN: __DEV__ ? TestIds.APP_OPEN : 'ca-app-pub-2299291161271404/6783251411',
  APPLO_AD_REVIEW_KEY: 'eX0S9tmnJ1XcymVBnyB2TsicpWGrOh_7hotGwTaKZrg1iXJoxHtV8TTx4AFtqPS2wWNdW4z35h1p885U1GZUf8',
  APPLO_SDK_KEY: 'Zq8XO4aSs9LKfFBloMiZAtVMivLQURJ9kQeXzf8EC5USEEXkTMJlwf2g3JpRDtKdlaPgZdnJaR41Oc9QMs3TJK',
  APPLO_BANNER: 'cd2f84001de651c4',
  APPLO_INTER: '147cc384368bb399',
  APPLO_REWARD: '0d37e88ba96a12e4',
  APPLO_NATIVE: 'ebcb575be73e6a73',
  APPLO_APP_OPEN: '79f93c5217403b5f',
};

const config: Partial<AdsConfigType> = {
  ios: {
    applovin: {
      interstitial: true,
      interstitialSplash: true,
      appOpen: true,
      banner: true,
      native: true,
      reward: true,
    },
    admob: {
      interstitial: true,
      interstitialSplash: true,
      appOpen: true,
      banner: true,
      native: true,
      reward: true,
    },
  },
};

function App(): JSX.Element {
  return (
    <SWRConfig
      value={{
        fallback: {
          'app.asd.evn': env,
          'app.asd.config': config,
        },
      }}>
      <GestureHandlerRootView style={styles.root}>
        <AdsProvider>
          <SafeAreaProvider>
            <BottomSheetModalProvider>
              <ThemeProvider>
                <RealmProvider>
                  <PlayingProvider>
                    <AppNavigation />
                  </PlayingProvider>
                  <Toast position={'bottom'} bottomOffset={60} />
                </RealmProvider>
              </ThemeProvider>
            </BottomSheetModalProvider>
          </SafeAreaProvider>
        </AdsProvider>
      </GestureHandlerRootView>
    </SWRConfig>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
