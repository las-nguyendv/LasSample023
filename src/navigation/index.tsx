import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Screens } from './type';
import Home from '../screens/Home';
import Composer from '../screens/Composer';
import Saved from '../screens/Saved';
import TabBar from '../components/TabBar';
import Play from '../screens/Play';

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator: FC = () => {
  return (
    <Tabs.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name={Screens.Home} component={Home} />
      <Tabs.Screen name={Screens.Composer} component={Composer} />
      <Tabs.Screen name={Screens.Saved} component={Saved} />
      {/* <Tabs.Screen name={Screens.Play} component={Play} /> */}
    </Tabs.Navigator>
  );
};

const AppNavigation: FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'light-content'} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="TabbarStack" component={TabNavigator} />
        <Stack.Screen name={Screens.Play} component={Play} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});
