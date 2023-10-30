import React, { PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import Sound from 'react-native-sound';
import { Media } from '../common/types';
import { noop } from 'swr/_internal';

type PlayingType = 'composer' | 'mix' | 'default_mix' | 'none';

interface PlayContexttype {
  medias: Media[];
  onSelectMedia: (item: Media) => void;
  togglePlay: () => void;
  isPlaying: boolean;
  playingType: PlayingType;
  setMedias: (data: Media[]) => void;
  playMultipleMedia: (data: Media[]) => void;
}

const defaultContextValue: PlayContexttype = {
  medias: [],
  onSelectMedia: noop,
  togglePlay: noop,
  isPlaying: false,
  playingType: 'none',
  setMedias: noop,
  playMultipleMedia: noop,
};

export const PlayContext = React.createContext<PlayContexttype>(defaultContextValue);

export function usePlayContext() {
  return useContext(PlayContext);
}

Sound.setCategory('Playback');

export const PlayingProvider: React.FC<PropsWithChildren> = React.memo(props => {
  const [medias, setMedias] = useState<Media[]>([]);

  const [playingType, setPlayingType] = useState<PlayingType>('none');

  const [isPlaying, setIsPlaying] = useState(false);

  const playMultipleMedia = useCallback(
    (data: Media[]) => {
      medias.forEach(s => {
        s.sound.stop();
      });

      setMedias(data);

      data.forEach(s => {
        s.sound.play();
        s.sound.setNumberOfLoops(-1);
        s.sound.setVolume(s.volume || 0.5);
      });
      setIsPlaying(true);
    },
    [medias],
  );

  const onSelectMedia = useCallback(
    (item: Media) => {
      try {
        const idx = medias.findIndex(el => el.name === item.name);
        let data: Media[] = [];
        if (idx === -1) {
          data = [...medias, item];
        } else {
          item.sound.stop();
          data = medias.filter(el => el.name !== item.name);
        }
        setMedias(data);
        data.forEach(s => {
          s.sound.stop();
        });

        data.forEach(s => {
          s.sound.play();
          s.sound.setNumberOfLoops(-1);
        });

        setIsPlaying(true);
        setPlayingType('composer');
      } catch (error) {}
    },
    [medias],
  );

  console.log('isPlaying', isPlaying);

  const togglePlay = useCallback(() => {
    try {
      if (medias.length === 0) {
        console.log('0');
        return;
      }
      if (isPlaying) {
        console.log('1', medias.length);
        medias.forEach(m => m.sound.stop());
      } else {
        console.log('2', medias.length);
        medias.forEach(m => m.sound.play());
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.log('togglePlayComposer error', error);
    }
  }, [isPlaying, medias]);

  const contextValue = useMemo(() => {
    return {
      medias,
      onSelectMedia,
      togglePlay,
      isPlaying,
      playingType,
      setMedias,
      playMultipleMedia,
    };
  }, [medias, onSelectMedia, togglePlay, isPlaying, playingType, setMedias, playMultipleMedia]);

  return <PlayContext.Provider value={contextValue}>{props.children}</PlayContext.Provider>;
});
