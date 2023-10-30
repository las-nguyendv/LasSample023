import { StyleSheet, Text, View } from 'react-native';
import React, { FC, useCallback } from 'react';
import { Media } from '../common/types';
import { Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { Colors } from '../common/styles';
import { ic_dot } from '../images';

interface Props {
  item: Media;
  onChangeVolume: (value: number) => void;
}

const MixItem: FC<Props> = ({ item, onChangeVolume }) => {
  const onValueChange = useCallback(
    (val: number) => {
      item.sound.setVolume(val);
      onChangeVolume(val);
    },
    [onChangeVolume],
  );

  return (
    <View style={styles.container}>
      <Image source={item.icon} style={styles.icon} resizeMode="contain" />
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor={Colors.Active}
        maximumTrackTintColor="#D0E0EE"
        value={item.volume ?? item.sound.getVolume()}
        onValueChange={onValueChange}
        onSlidingComplete={onChangeVolume}
        step={0.1}
        thumbImage={ic_dot}
      />
    </View>
  );
};

export default MixItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 32,
    width: '100%',
  },
  icon: {
    width: 28,
    height: 28,
  },
  slider: {
    flex: 1,
    height: 12,
    marginLeft: 10,
  },
});
