import { ActionSheetIOS, Alert, FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import React, { FC, useCallback } from 'react';
import Layout from '../components/Layout';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontFamily } from '../common/styles';
import SavedItem from '../components/SavedItem';
import { SavedMix, useQuery } from '../provider/RealmProvider';
import { useSavedMix } from '../hooks/useSavedMix';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../navigation/type';
import { Media } from '../common/types';
import { usePlayContext } from '../provider/PlayProvider';

const Saved: FC = () => {
  const navigation = useNavigation();

  const { playMultipleMedia } = usePlayContext();

  const onPressItem = useCallback(
    (item: SavedMix, medias: Media[]) => {
      playMultipleMedia(medias);
      navigation.navigate(Screens.Play, {
        type: item.type as any,
        savedMix: item,
      });
    },
    [playMultipleMedia],
  );

  const mixs = useQuery(SavedMix);

  const { removeMix, renameMix } = useSavedMix();

  const onPressItemOption = useCallback((item: SavedMix) => {
    try {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Rename', 'Play', 'Delete'],
          destructiveButtonIndex: 3,
          cancelButtonIndex: 0,
          title: 'item name',
          userInterfaceStyle: 'dark',
        },
        buttonIndex => {
          if (buttonIndex === 0) {
          } else if (buttonIndex === 1) {
            return Alert.prompt(
              'Rename Mixs',
              'Enter name',
              (text: string) => {
                renameMix(item, text);
              },
              'plain-text',
              '',
              'default',
              {},
            );
          } else if (buttonIndex === 2) {
          } else if (buttonIndex === 3) {
            Alert.alert('Delete Mix', 'Are you sure you want to delete this mix?', [
              {
                text: 'OK',
                onPress: () => {
                  //delete mix
                  removeMix(item?._id?.toHexString());
                },
              },
              { text: 'Cancel', style: 'cancel' },
            ]);
          }
        },
      );
    } catch (error) {}
  }, []);

  const renderItem = useCallback<ListRenderItem<SavedMix>>(({ item }) => {
    return <SavedItem item={item} onSelect={onPressItem} onPressOption={onPressItemOption} />;
  }, []);

  return (
    <Layout>
      <SafeAreaView edges={['top']} />
      <Text style={styles.title}>Saved</Text>
      <FlatList
        data={mixs}
        renderItem={renderItem}
        keyExtractor={item => item._id.toHexString()}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </Layout>
  );
};

export default Saved;

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 28,
    fontFamily: FontFamily.SFProRoundedBold,
    marginLeft: 20,
    marginTop: 10,
  },
  list: {
    marginTop: 20,
  },
  listContent: {
    marginLeft: 20,
    gap: 18,
  },
});
