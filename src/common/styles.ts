import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const DeviceWidth = Math.min(width, height);
export const DeviceHeight = Math.max(width, height);

export const isSmallDevice = DeviceHeight < 800;

export const TabbarHeight = isSmallDevice ? 56 : 76;

export const Colors = {
  Primary: '#21283F',
  Secondary: '#2D344B',
  Background1: '#141927',
  Background2: '#2a2f2b',
  Text1: '#FFFFFF',
  Text2: '#A9A9A9',
  Text3: '#FFFFFF99',
  Active: '#CDF269',
  Active1: '#4870FF',
  Active2: '#00D971',
  Active3: '#FF9C41',
};

// background-image: linear-gradient(180deg, #0C0F12 0%, #0B0C19 100%);

export const FontFamily = {
  SFProRoundedSemibold: 'SFProRounded-Semibold',
  SFProRoundedMedium: 'SFProRounded-Medium',
  SFProRoundedRegular: 'SFProRounded-Regular',
  SFProRoundedBold: 'SFProRounded-Bold',
};
