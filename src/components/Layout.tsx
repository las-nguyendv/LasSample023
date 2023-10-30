import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { FC, PropsWithChildren } from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <LinearGradient style={styles.container} colors={['#0C0F12', '#0B0C19']}>
      {children}
    </LinearGradient>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
