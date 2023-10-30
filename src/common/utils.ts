import { SavedMix } from '../provider/RealmProvider';
import { AmbienceData, AnimalData, NatureData } from './data';
import { Media, MixRawData, Sample, SoundType } from './types';

export const getMedias = (item?: SavedMix) => {
  const data = item?.data ? (JSON.parse(item.data) as MixRawData[]) : [];
  const result: Media[] = [];
  data.forEach(el => {
    let item;
    if (el.type === SoundType.Nature) {
      item = NatureData.find(val => val.name === el.name);
    }
    if (el.type === SoundType.Animals) {
      item = AnimalData.find(val => val.name === el.name);
    }
    if (el.type === SoundType.Ambience) {
      item = AmbienceData.find(val => val.name === el.name);
    }
    if (item) {
      item.volume = el.volume || 0.5;
      result.push(item);
    }
  });
  return result;
};

export const getSampleMedias = (item?: Sample) => {
  const result: Media[] = [];
  item?.data.forEach(el => {
    let item;
    if (el.type === SoundType.Nature) {
      item = NatureData.find(val => val.name === el.name);
    }
    if (el.type === SoundType.Animals) {
      item = AnimalData.find(val => val.name === el.name);
    }
    if (el.type === SoundType.Ambience) {
      item = AmbienceData.find(val => val.name === el.name);
    }
    if (item) {
      item.volume = el.volume || 0.5;
      result.push(item);
    }
  });
  return result;
};
