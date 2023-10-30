import { ImageSourcePropType } from 'react-native';
import Sound from 'react-native-sound';

export enum SoundType {
  Ambience = 'Ambience',
  Nature = 'Nature',
  Animals = 'Animals',
}

export interface Media {
  name: string;
  icon: ImageSourcePropType;
  sound: Sound;
  type: SoundType;
  volume?: number;
}

export interface MixRawData {
  name: string;
  volume: number;
  type: SoundType;
}

export interface Sample {
  image: ImageSourcePropType;
  data: MixRawData[];
  name: string;
}
