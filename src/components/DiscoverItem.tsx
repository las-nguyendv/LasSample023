import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { Colors, FontFamily } from '../common/styles';
import { guitar_camp } from '../images';
import { Icon } from '@rneui/themed';
import { Sample } from '../common/types';

interface Props {
  item: Sample;
  onPress: () => void;
}
const DiscoverItem: FC<Props> = ({ onPress, item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContain}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
      </View>
      <Text style={styles.title}>{item.name}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name="play" type="ionicon" color={'#fff'} size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default DiscoverItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  imageContain: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: FontFamily.SFProRoundedRegular,
    marginTop: 8,
  },
  subTitle: {
    color: '#EBEBF5',
    fontSize: 13,
    fontFamily: FontFamily.SFProRoundedRegular,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.Background1,
    position: 'absolute',
    top: 8,
    right: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
