import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { FC, useMemo } from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Button, Icon } from '@rneui/themed';
import { Colors, FontFamily, TabbarHeight, isSmallDevice } from '../common/styles';
import { Screens } from '../navigation/type';
import { ic_composer, ic_discover, ic_heart } from '../images';
import { Text } from 'react-native';

const TabBar: FC<BottomTabBarProps> = ({ navigation, state }) => {
  const renderTabBar = useMemo(() => {
    return state.routes.map((route, index) => {
      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          // The `merge: true` option makes sure that the params inside the tab screen are preserved
          navigation.navigate({ name: route.name, merge: true, params: {} });
        }
      };

      const onLongPress = () => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        });
      };

      let icon = ic_discover;

      switch (route.name) {
        case Screens.Home:
          icon = ic_discover;
          break;
        case Screens.Composer:
          icon = ic_composer;
          break;
        case Screens.Saved:
          icon = ic_heart;
          break;
        default:
          break;
      }

      return (
        <TouchableOpacity key={route.key} style={styles.button} onPress={onPress} onLongPress={onLongPress}>
          <Image source={icon} style={isFocused ? styles.icon : styles.iconInactive} />
          <Text style={[styles.text, { color: isFocused ? Colors.Active : '#9798A7' }]}>{route.name}</Text>
        </TouchableOpacity>
      );
    });
  }, [navigation, state.index, state.routes]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderTabBar}</View>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    paddingBottom: isSmallDevice ? 20 : 30,
    paddingHorizontal: 20,
    // backgroundColor: 'transparent',
    backgroundColor: '#0B0C19',
    paddingTop: 15,
  },
  content: {
    height: 68,
    width: '100%',
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1B1D33A6',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  iconInactive: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#9798A7',
  },
  text: {
    fontFamily: FontFamily.SFProRoundedMedium,
    fontSize: 10,
    marginTop: 8,
    color: '#9798A7',
  },
});
