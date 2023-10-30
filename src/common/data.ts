import {
  guitar_camp,
  ic_bird,
  ic_cafe,
  ic_camel,
  ic_car,
  ic_cat,
  ic_dog,
  ic_duck,
  ic_elephant,
  ic_fan,
  ic_fire,
  ic_forest,
  ic_frog,
  ic_horse,
  ic_leaf,
  ic_lullaby,
  ic_night,
  ic_noise,
  ic_ocean,
  ic_plane,
  ic_rabbit,
  ic_rain,
  ic_snow,
  ic_thunder,
  ic_train,
  ic_wave,
  ic_white_noize,
  ic_wind,
  ic_window,
  img_creek,
  img_forest,
  img_night,
  img_night2,
  img_ocean,
} from '../images';
import {
  airplane_main,
  birds,
  brown_noise,
  cafe,
  camel,
  car,
  cats,
  dogs,
  ducks,
  elephant,
  fan,
  fire,
  forest,
  frogs,
  horse,
  leaves,
  ocean,
  rabbit,
  rain,
  rain_on_window,
  thunders,
  train,
  whitenoise,
  wind,
  night,
} from './sounds';
import { Media, Sample, SoundType } from './types';

export const NatureData: Media[] = [
  {
    name: 'Rain',
    icon: ic_rain,
    sound: rain,
    type: SoundType.Nature,
  },
  {
    name: 'Forest',
    icon: ic_forest,
    sound: forest,
    type: SoundType.Nature,
  },
  {
    name: 'Ocean',
    icon: ic_ocean,
    sound: ocean,
    type: SoundType.Nature,
  },
  {
    name: 'Thunder',
    icon: ic_thunder,
    sound: thunders,
    type: SoundType.Nature,
  },
  {
    name: 'Snow',
    icon: ic_snow,
    sound: thunders,
    type: SoundType.Nature,
  },
  {
    name: 'Lullaby',
    icon: ic_lullaby,
    sound: night,
    type: SoundType.Nature,
  },
  {
    name: 'Wind',
    icon: ic_wind,
    sound: wind,
    type: SoundType.Nature,
  },
  {
    name: 'Wave',
    icon: ic_wave,
    sound: ocean,
    type: SoundType.Nature,
  },
  {
    name: 'Leaf',
    icon: ic_leaf,
    sound: leaves,
    type: SoundType.Nature,
  },
];

export const AmbienceData: Media[] = [
  {
    name: 'Car',
    icon: ic_car,
    sound: car,
    type: SoundType.Ambience,
  },
  {
    name: 'White noise',
    icon: ic_white_noize,
    sound: whitenoise,
    type: SoundType.Ambience,
  },
  {
    name: 'Fire',
    icon: ic_fire,
    sound: fire,
    type: SoundType.Ambience,
  },
  {
    name: 'Train',
    icon: ic_train,
    sound: train,
    type: SoundType.Ambience,
  },
  {
    name: 'Fan',
    icon: ic_fan,
    sound: fan,
    type: SoundType.Ambience,
  },
  {
    name: 'Plane',
    icon: ic_plane,
    sound: airplane_main,
    type: SoundType.Ambience,
  },
  {
    name: 'Cafe',
    icon: ic_cafe,
    sound: cafe,
    type: SoundType.Ambience,
  },
  {
    name: 'Noise',
    icon: ic_noise,
    sound: brown_noise,
    type: SoundType.Ambience,
  },
  {
    name: 'Window',
    icon: ic_window,
    sound: rain_on_window,
    type: SoundType.Ambience,
  },
];

export const AnimalData: Media[] = [
  {
    name: 'Birds',
    icon: ic_bird,
    sound: birds,
    type: SoundType.Animals,
  },
  {
    name: 'Cats',
    icon: ic_cat,
    sound: cats,
    type: SoundType.Animals,
  },
  {
    name: 'Frogs',
    icon: ic_frog,
    sound: frogs,
    type: SoundType.Animals,
  },
  {
    name: 'Elephant',
    icon: ic_elephant,
    sound: elephant,
    type: SoundType.Animals,
  },
  {
    name: 'Ducks',
    icon: ic_duck,
    sound: ducks,
    type: SoundType.Animals,
  },
  {
    name: 'Dogs',
    icon: ic_dog,
    sound: dogs,
    type: SoundType.Animals,
  },
  {
    name: 'Rabbits',
    icon: ic_rabbit,
    sound: rabbit,
    type: SoundType.Animals,
  },
  {
    name: 'Horse',
    icon: ic_horse,
    sound: horse,
    type: SoundType.Animals,
  },
  {
    name: 'Camels',
    icon: ic_camel,
    sound: camel,
    type: SoundType.Animals,
  },
];

export const SAMPLES: Sample[] = [
  {
    image: guitar_camp,
    name: 'Camping',
    data: [
      {
        name: 'Ocean',
        volume: 0.4,
        type: SoundType.Nature,
      },
      {
        name: 'Wind',
        volume: 0.2,
        type: SoundType.Nature,
      },
      {
        name: 'Fire',
        volume: 0.6,
        type: SoundType.Ambience,
      },
      {
        name: 'Cafe',
        volume: 0.3,
        type: SoundType.Ambience,
      },
    ],
  },
  {
    image: img_creek,
    name: 'Morning',
    data: [
      {
        name: 'Birds',
        volume: 0.1,
        type: SoundType.Animals,
      },
      {
        name: 'Leaf',
        volume: 0.4,
        type: SoundType.Nature,
      },
    ],
  },
  {
    image: img_night,
    name: 'Night',
    data: [
      {
        name: 'Birds',
        volume: 0.2,
        type: SoundType.Animals,
      },
      {
        name: 'Leaf',
        volume: 0.4,
        type: SoundType.Nature,
      },
      {
        name: 'Lullaby',
        volume: 0.6,
        type: SoundType.Nature,
      },
    ],
  },
  {
    image: img_forest,
    name: 'Forest',
    data: [
      {
        name: 'Birds',
        volume: 0.3,
        type: SoundType.Animals,
      },
      {
        name: 'Rabbits',
        volume: 0.3,
        type: SoundType.Animals,
      },
      {
        name: 'Leaf',
        volume: 0.4,
        type: SoundType.Nature,
      },
      {
        name: 'Forest',
        volume: 0.6,
        type: SoundType.Nature,
      },
    ],
  },
  {
    image: img_night2,
    name: 'Full moon',
    data: [
      {
        name: 'Lullaby',
        volume: 0.1,
        type: SoundType.Nature,
      },
      {
        name: 'Leaf',
        volume: 0.4,
        type: SoundType.Nature,
      },
    ],
  },
  {
    image: img_ocean,
    name: 'Ocean',
    data: [
      {
        name: 'Ocean',
        volume: 0.1,
        type: SoundType.Nature,
      },
      {
        name: 'Wave',
        volume: 0.4,
        type: SoundType.Nature,
      },
    ],
  },
];
