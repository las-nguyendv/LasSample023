/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-get-random-values';
// import Realm from 'realm';
// Realm.flags.THROW_ON_GLOBAL_REALM = true;

AppRegistry.registerComponent(appName, () => App);
