import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useMemo } from 'react';
import { Colors, FontFamily } from '../../common/styles';
import { ic_rain } from '../../images';
import { Media, SoundType } from '../../common/types';

interface Props {
  media: Media;
  onPress: (item: Media) => void;
  isSelected: boolean;
}

const Item: FC<Props> = ({ media, onPress, isSelected }) => {
  const selectedStyle = useMemo(() => {
    if (!isSelected) {
      return null;
    }
    return {
      backgroundColor:
        media.type === SoundType.Ambience
          ? Colors.Active1
          : media.type === SoundType.Nature
          ? Colors.Active2
          : Colors.Active3,
    };
  }, [media, isSelected]);

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(media)}>
      <View style={[styles.top, selectedStyle]}>
        <Image source={media.icon} style={styles.icon} resizeMode="contain" />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.title}>{media.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 125,
    borderRadius: 16,
    backgroundColor: Colors.Primary,
    overflow: 'hidden',
  },
  top: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    width: '100%',
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Secondary,
  },
  title: {
    fontSize: 10,
    fontFamily: FontFamily.SFProRoundedMedium,
    color: '#fff',
  },
  icon: {
    width: 28,
    height: 28,
  },
});
