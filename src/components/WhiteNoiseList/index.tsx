import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import React, { FC, useCallback } from 'react';
import { FontFamily } from '../../common/styles';
import Item from './Item';
import { Media } from '../../common/types';
import { usePlayContext } from '../../provider/PlayProvider';

interface Props {
  title: string;
  subTitle?: string;
  data: Media[];
  onPressItem: (item: Media) => void;
}
const WhiteNoiseList: FC<Props> = ({ title, subTitle, data, onPressItem }) => {
  const { medias, onSelectMedia } = usePlayContext();

  const renderItem = useCallback<ListRenderItem<Media>>(
    ({ item }) => {
      const isSelected = medias.findIndex(el => el.name === item.name) >= 0;
      return <Item media={item} onPress={onSelectMedia} isSelected={isSelected} />;
    },
    [onSelectMedia, medias],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        horizontal
        contentContainerStyle={styles.listContent}
        style={styles.list}
      />
    </View>
  );
};

export default WhiteNoiseList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 50,
  },
  title: {
    fontFamily: FontFamily.SFProRoundedRegular,
    fontSize: 17,
    color: '#fff',
    marginLeft: 20,
  },
  subTitle: {
    fontFamily: FontFamily.SFProRoundedRegular,
    fontSize: 12,
    color: '#EBEBF5',
    marginLeft: 20,
  },
  content: {},
  listContent: {
    gap: 16,
    paddingBottom: 5,
    paddingHorizontal: 20,
  },
  list: {
    marginTop: 12,
  },
});
