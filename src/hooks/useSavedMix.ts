import { useCallback } from 'react';
import Realm, { UpdateMode } from 'realm';
import { useRealm, useQuery, SavedMix } from '../provider/RealmProvider';
import { Media, MixRawData } from '../common/types';
import Toast from 'react-native-toast-message';

export const useSavedMix = () => {
  const realm = useRealm();

  const mixs = useQuery(SavedMix);

  const saveMix = useCallback(
    (name: string, data: Media[], type = 'composer') => {
      try {
        const mix = mixs.filtered('name == $0', name);
        if (mix.length > 0) {
          Toast.show({
            type: 'error',
            text1: 'This name already exists',
          });
        } else {
          const raw = data.map(el => ({
            name: el.name,
            volume: 0.5,
            type: el.type,
          }));

          realm.write(() => {
            realm.create('SavedMix', {
              _id: new Realm.BSON.ObjectId(),
              name: name,
              data: JSON.stringify(raw),
              type,
            });
          });
        }
      } catch (error) {
        console.log('saveMix error', error);
      }
    },
    [mixs, realm],
  );

  const removeMix = useCallback(
    (id?: string) => {
      try {
        const _id = new Realm.BSON.ObjectId(id);
        const mix = realm.objectForPrimaryKey(SavedMix, _id);
        if (mix) {
          realm.write(() => {
            realm.delete(mix);
          });
        }
      } catch (error) {
        console.log('removeMix error', error);
      }
    },
    [realm],
  );

  const renameMix = useCallback(
    (item?: SavedMix, newName?: string) => {
      try {
        if (!item || !newName) {
          return;
        }
        realm.write(() => {
          item.name = newName;
        });
      } catch (error) {
        console.log('rename mix error', error);
      }
    },
    [realm],
  );

  const updateMix = useCallback((item?: SavedMix, data?: MixRawData[]) => {
    try {
      if (!item || !data) {
        return;
      }
      realm.write(() => {
        item.data = JSON.stringify(data);
      });
    } catch (error) {
      console.log('updateMix mix error', error);
    }
  }, []);

  return {
    saveMix,
    removeMix,
    renameMix,
    updateMix,
  };
};
