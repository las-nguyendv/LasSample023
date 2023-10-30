import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useMemo } from 'react';
import { guitar_camp } from '../images';
import { Icon } from '@rneui/themed';
import { Colors, FontFamily } from '../common/styles';
import { SavedMix } from '../provider/RealmProvider';
import { Media, MixRawData, SoundType } from '../common/types';
import { AmbienceData, AnimalData, NatureData } from '../common/data';

interface Props {
  item: SavedMix;
  onSelect: (item: SavedMix, medias: Media[]) => void;
  onPressOption: (item: SavedMix) => void;
}

const SavedItem: FC<Props> = ({ item, onSelect, onPressOption }) => {
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
        item.volume = el.volume || 0.5;
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
            <Image source={media.icon} style={styles.icon} resizeMode="contain" />
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
                <Image source={media.icon} style={styles.icon} resizeMode="contain" />
              </View>
            );
          })}
          <View style={styles.image} key={'more'}>
            <Text style={styles.numText}>{`+${medias.length - 3}`}</Text>
          </View>
        </>
      );
    }
  }, [medias]);

  return (
    <TouchableOpacity style={styles.container} onPress={() => onSelect(item, medias)}>
      {/* <Image source={guitar_camp} style={styles.image} /> */}
      <View style={styles.images}>{renderIcons}</View>
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

export default SavedItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 82,
  },
  image: {
    width: 36,
    height: 36,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  images: {
    width: 72,
    height: 72,
    flexDirection: 'row',

    flexWrap: 'wrap',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.Background1,
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    height: 82,
    borderBottomColor: '#D8D8D82B',
    borderBottomWidth: 1,
    marginLeft: 26,
    paddingBottom: 10,
  },
  texts: {
    flex: 1,
  },
  menuBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    paddingRight: 5,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 17,
    fontFamily: FontFamily.SFProRoundedRegular,
  },
  subTitle: {
    color: '#EBEBF5',
    fontSize: 13,
    fontFamily: FontFamily.SFProRoundedRegular,
  },
  numText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: FontFamily.SFProRoundedSemibold,
  },
});
