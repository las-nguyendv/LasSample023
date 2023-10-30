import { ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useCallback, useState } from 'react';
import Layout from '../components/Layout';
import { Colors, FontFamily } from '../common/styles';
import HeaderLayout from '../components/HeaderLayout';
import ListCategory from '../components/ListCategory';
import { FlatList } from 'react-native';
import DiscoverItem from '../components/DiscoverItem';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../navigation/type';
import { SAMPLES } from '../common/data';
import { Sample } from '../common/types';
import { getSampleMedias } from '../common/utils';
import { usePlayContext } from '../provider/PlayProvider';
import { isTablet } from 'react-native-device-info';
import { Icon } from '@rneui/themed';

const Home: FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);

  const onSelectCategory = useCallback(
    (item: string) => {
      let data: string[] = [];
      if (categories.indexOf(item) >= 0) {
        data = categories.filter(el => el !== item);
      } else {
        data = [...categories, item];
      }
      setCategories(data);
      setIsSelectedAll(false);
    },
    [categories],
  );

  const onSelectAllCategory = useCallback(() => {
    setIsSelectedAll(true);
    setCategories([]);
  }, []);

  const navigation = useNavigation();

  const { playMultipleMedia, togglePlay, playingType, isPlaying, medias } = usePlayContext();

  const onPressItem = useCallback(
    (item: Sample) => {
      const medias = getSampleMedias(item);
      playMultipleMedia(medias);
      navigation.navigate(Screens.Play, {
        type: 'discover',
        item: undefined,
        sample: item,
      });
    },
    [playMultipleMedia],
  );

  const renderItem = useCallback<ListRenderItem<Sample>>(
    ({ item }) => {
      return (
        <View style={styles.item}>
          <DiscoverItem onPress={() => onPressItem(item)} item={item} />
        </View>
      );
    },
    [onPressItem],
  );

  return (
    <Layout>
      <HeaderLayout contentStyle={styles.headerContent}>
        <View style={styles.header2}>
          <Text style={styles.title}>Sleep</Text>
          {medias.length > 0 && (
            <TouchableOpacity style={styles.playBtn} onPress={togglePlay}>
              <Icon name={isPlaying ? 'pause' : 'play'} type="ionicon" color={Colors.Primary} size={20} />
            </TouchableOpacity>
          )}
        </View>
        {/* <ListCategory selected={categories} onSelect={onSelectCategory} onSelectAll={onSelectAllCategory} /> */}
      </HeaderLayout>
      <FlatList
        data={SAMPLES}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.listContent}
        style={styles.list}
      />
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.Background1,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontFamily: FontFamily.SFProRoundedBold,
    marginLeft: 22.5,
  },
  headerContent: {
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 15,
    height: 80,
  },
  listContent: {
    gap: isTablet() ? 40 : 16,
    paddingHorizontal: 12,
  },
  listColumn: {
    gap: 16,
  },
  list: {
    marginTop: 16,
  },
  item: {
    flex: 1,
  },
  header2: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  playBtn: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
});
