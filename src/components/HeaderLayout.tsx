import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { FC, PropsWithChildren, useMemo } from 'react';
import { Colors } from '../common/styles';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  contentStyle?: ViewStyle;
}
const HeaderLayout: FC<PropsWithChildren<Props>> = ({ children, contentStyle }) => {
  const headerStyle = useMemo(() => {}, []);

  const _contentStyle = useMemo(() => {
    return [styles.content, contentStyle];
  }, [contentStyle]);

  return (
    <View style={styles.header}>
      <SafeAreaView edges={['top']} />
      <View style={_contentStyle}>{children}</View>
    </View>
  );
};

export default HeaderLayout;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: Colors.Background1,
  },
  content: {
    height: 117,
    width: '100%',
  },
});
