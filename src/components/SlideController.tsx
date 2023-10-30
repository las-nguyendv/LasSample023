import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import { FontFamily } from '../common/styles';

interface Props {}

const SlideController: FC<Props> = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'00:00'}</Text>
      <Slider step={1} minimumValue={0} maximumValue={10} style={styles.slide} />
      <Text style={styles.text}>{'02:46'}</Text>
    </View>
  );
};

export default SlideController;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slide: {
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: FontFamily.SFProRoundedRegular,
    color: '#fff',
  },
});
