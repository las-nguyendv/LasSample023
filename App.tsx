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

function App(): JSX.Element {
  return (
    <SWRConfig>
      <GestureHandlerRootView style={styles.root}>
        <SafeAreaProvider>
          <BottomSheetModalProvider>
            <ThemeProvider>
              {/* <StatusBar barStyle={'light-content'} /> */}
              <RealmProvider>
                <PlayingProvider>
                  <AppNavigation />
                </PlayingProvider>
                <Toast position={'bottom'} bottomOffset={60} />
              </RealmProvider>
            </ThemeProvider>
          </BottomSheetModalProvider>
        </SafeAreaProvider>
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
