import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useMemo } from 'react';
import { Icon } from '@rneui/themed';
import { Media, MixRawData, SoundType } from '../common/types';
import { AmbienceData, AnimalData, NatureData } from '../common/data';
import { Props, styles } from './SavedItem';

export const SavedItem: FC<Props> = ({ item, onSelect, onPressOption }) => {
  const medias = useMemo(() => {
    const data = item.data ? (JSON.parse(item.data) as MixRawData[]) : [];
    const result: Media[] = [];
    data.forEach(el => {
      let item;
      if (el.type === SoundType.Nature) {
        item = NatureData.find(val => val.name === el.name);
      }
      if (el.type === SoundType.Animals) {
        item = AnimalData.find(val => val.name === el.name);
      }
      if (el.type === SoundType.Ambience) {
        item = AmbienceData.find(val => val.name === el.name);
      }
      if (item) {
        result.push(item);
      }
    });
    return result;
  }, [item]);

  const renderIcons = useMemo(() => {
    if (medias.length <= 4) {
      return medias.map(media => {
        return (
          <View style={styles.image} key={media.name}>
            <Image source={media.icon} style={styles.icon} />
          </View>
        );
      });
    } else {
      const data = medias.slice(0, 3);
      return (
        <>
          {data.map(media => {
            return (
              <View style={styles.image} key={media.name}>
                <Image source={media.icon} style={styles.icon} />
              </View>
            );
          })}
          <View style={styles.image} key={'more'}>
            <Text>{`+${medias.length - 3}`}</Text>
          </View>
        </>
      );
    }
  }, []);

  return (
    <TouchableOpacity style={styles.container} onPress={() => onSelect(item)}>
      {/* <Image source={guitar_camp} style={styles.image} /> */}
      <View style={styles.images}>
        {medias.map(icon => {
          if (!icon) {
            return null;
          }
          return (
            <View style={styles.image} key={icon.name}>
              <Image source={icon.icon} style={styles.icon} />
            </View>
          );
        })}
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.texts}>
            <Text style={styles.title}>{item.name}</Text>
            {/* <Text style={styles.subTitle}>01:23</Text> */}
          </View>
          <Icon
            name="dots-vertical"
            type="material-community"
            size={24}
            color={'#848484'}
            containerStyle={styles.menuBtn}
            onPress={() => onPressOption(item)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
