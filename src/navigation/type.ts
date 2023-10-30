import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Media, Sample } from '../common/types';
import { SavedMix } from '../provider/RealmProvider';

export enum Screens {
  MainTabs = 'MainTabs',
  Home = 'Home',
  Composer = 'Composer',
  Saved = 'Saved',
  Play = 'Play',
  Mixing = 'Mixing',
}

type RootStackParamList = {
  [Screens.MainTabs]: undefined;
  [Screens.Home]: undefined;
  [Screens.Composer]: undefined;
  [Screens.Saved]: undefined;
  [Screens.Play]: {
    type: 'composer' | 'discover';
    item?: Media[];
    sample?: Sample;
    savedMix?: SavedMix;
  };
};

type RouteName = keyof RootStackParamList;

type ScreenProps<T extends keyof RootStackParamList, I extends string | undefined = undefined> = NativeStackScreenProps<
  RootStackParamList,
  T,
  I
>;

type RouteList = { name: RouteName }[];

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type { RootStackParamList, RouteName, RouteList, ScreenProps };
