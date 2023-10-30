import { FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useCallback } from 'react';
import { Colors, FontFamily } from '../common/styles';
import { ic_menu_dots } from '../images';

interface Props {
  selected: string[];
  onSelect: (item: string) => void;
  onSelectAll: () => void;
}

const DATA = ['Nature', 'For Kids', 'Nature 1', 'All 1', 'Nature 3', 'For Kids cx', 'Nature c'];

const ListCategory: FC<Props> = ({ selected, onSelect, onSelectAll }) => {
  const renderItem = useCallback<ListRenderItem<string>>(
    ({ item }) => {
      const isActive = selected.find(el => el === item);
      return (
        <TouchableOpacity
          style={[styles.item, isActive ? { backgroundColor: Colors.Active } : null]}
          onPress={() => onSelect(item)}>
          <Text style={[styles.itemText, isActive ? { color: '#373737' } : null]}>{item}</Text>
        </TouchableOpacity>
      );
    },
    [onSelect, selected],
  );

  const renderAllButton = useCallback(() => {
    const isActive = selected.length === 0;
    return (
      <TouchableOpacity
        style={[styles.itemAll, isActive ? { backgroundColor: Colors.Active } : null]}
        onPress={onSelectAll}>
        <Image
          source={ic_menu_dots}
          style={[styles.iconMenu, isActive ? null : { tintColor: '#FFFFFF' }]}
          resizeMode="contain"
        />
        <Text style={[styles.itemText, isActive ? { color: '#373737' } : null]}>{'All'}</Text>
      </TouchableOpacity>
    );
  }, [onSelectAll, selected]);

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item}
        horizontal
        contentContainerStyle={styles.content}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={renderAllButton}
      />
    </View>
  );
};

export default ListCategory;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 38,
    marginTop: 11,
  },
  content: {
    paddingLeft: 20,
    gap: 16,
  },
  item: {
    height: 38,
    paddingHorizontal: 24,
    backgroundColor: Colors.Primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
  },
  itemAll: {
    height: 38,
    paddingHorizontal: 24,
    backgroundColor: Colors.Primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 16,
    fontFamily: FontFamily.SFProRoundedSemibold,
    color: 'white',
  },
  iconMenu: {
    width: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
});
