import { Dimensions, StyleSheet, Text } from 'react-native';
import { Colors, FontFamily } from '../common/styles';
import { Image, TouchableOpacity, View } from 'react-native';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Layout from '../components/Layout';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import PlayerEditModal from '../components/PlayerEditModal';
import { ActionSheetIOS } from 'react-native';
// @ts-ignore: Unreachable code error
import BackgroundTimer from 'react-native-background-timer';
import { useParams } from '../hooks/useParams';
import { Screens } from '../navigation/type';
import { useSavedMix } from '../hooks/useSavedMix';
import { MixRawData } from '../common/types';
import { getMedias, getSampleMedias } from '../common/utils';
import LottieView from 'lottie-react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { usePlayContext } from '../provider/PlayProvider';
import { AdsBanner } from 'ads';

export const Play: FC = () => {
  const navigation = useNavigation();

  const { type, item, savedMix, sample } = useParams<Screens.Play>();

  const [favoriteSamples, setFavoriteSamples] = useState<string[]>([]);
  const [update, setUpdate] = useState(false);

  const { getItem, setItem } = useAsyncStorage('@app_saved_samples');

  useEffect(() => {
    (async () => {
      const str = await getItem();
      const data = str != null ? JSON.parse(str) : ([] as string[]);
      setFavoriteSamples(data);
    })();
  }, [update]);

  const liked = useMemo(() => {
    if (type === 'composer') {
      return true;
    } else {
      const idx = favoriteSamples.findIndex(el => sample?.name === el);
      return idx >= 0;
    }
  }, [favoriteSamples, type, sample]);

  const { updateMix } = useSavedMix();

  const medias = useMemo(() => {
    if (type === 'composer') {
      return getMedias(savedMix);
    }
    return getSampleMedias(sample);
  }, [type, savedMix, sample]);

  const { setMedias, togglePlay, isPlaying } = usePlayContext();

  useEffect(() => {
    const millisecond = 30 * 60 * 1000;
    BackgroundTimer.stopBackgroundTimer();
    BackgroundTimer.runBackgroundTimer(async () => {
      //
      BackgroundTimer.stopBackgroundTimer();
    }, millisecond);
  }, []);

  const runBackGroundTask = useCallback((value: number) => {
    const millisecond = value * 60 * 1000;
    BackgroundTimer.stopBackgroundTimer();
    BackgroundTimer.runBackgroundTimer(async () => {
      //
      // onPause();
      BackgroundTimer.stopBackgroundTimer();
    }, millisecond);
  }, []);

  const onSelectTime = useCallback(() => {
    try {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', '10 minutes', '15 minutes', '30 minutes'],
          cancelButtonIndex: 0,
          title: 'Timer',
          userInterfaceStyle: 'dark',
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            return;
          } else if (buttonIndex === 1) {
            runBackGroundTask(10);
          } else if (buttonIndex === 2) {
            runBackGroundTask(15);
          } else if (buttonIndex === 3) {
            runBackGroundTask(30);
          }
        },
      );
    } catch (error) {}
  }, [runBackGroundTask]);

  const onSave = useCallback((data: MixRawData[]) => {
    updateMix(savedMix, data);
  }, []);

  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (isPlaying) {
      animationRef.current?.play();
    } else {
      animationRef.current?.pause();
    }
  }, [isPlaying]);

  const renderImage = useMemo(() => {
    if (type === 'discover' && sample) {
      return <Image source={sample?.image} style={styles.image} resizeMode="cover" />;
    }
    return (
      <View style={styles.image}>
        <LottieView
          source={require('../resouces/animations/animation_music.json')}
          loop
          style={styles.image}
          ref={animationRef}
        />
      </View>
    );
  }, [sample, type]);

  const toggleLike = useCallback(() => {
    if (type === 'composer') {
      return;
    }
    if (liked) {
      const newData = favoriteSamples.filter(el => el !== sample?.name);
      setItem(JSON.stringify(newData));
    } else {
      const newData = [...favoriteSamples, sample?.name];
      setItem(JSON.stringify(newData));
    }
    setUpdate(pre => !pre);
  }, [setItem, favoriteSamples]);

  return (
    <Layout>
      <SafeAreaView edges={['top']} />
      <View style={styles.header}>
        <Icon name="keyboard-backspace" type="material-icons" color={'#fff'} size={30} onPress={navigation.goBack} />
        <PlayerEditModal medias={medias} onSave={onSave} />
      </View>
      <View style={styles.content}>
        <View style={styles.imageContent}>{renderImage}</View>
        <View style={styles.slider}>{/* <SlideController /> */}</View>
        <View style={styles.controller}>
          <View style={styles.box}>
            <Icon
              name={liked ? 'heart' : 'heart-outline'}
              type="ionicon"
              onPress={toggleLike}
              color={liked ? Colors.Active : '#fff'}
            />
          </View>
          <View style={styles.box}>
            <TouchableOpacity style={styles.playBtn} onPress={togglePlay}>
              <Icon name={isPlaying ? 'pause' : 'play'} color={'#000000'} type="ionicon" />
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <Icon name={'alarm-outline'} type="ionicon" onPress={onSelectTime} color={'#fff'} />
          </View>
        </View>
        <AdsBanner style={{ marginTop: 20 }} />
      </View>
    </Layout>
  );
};

export default Play;

const { width } = Dimensions.get('screen');

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  editText: {
    color: Colors.Active,
    fontSize: 16,
    fontFamily: FontFamily.SFProRoundedBold,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  imageContent: {
    width: '100%',
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'red',
  },
  slider: {
    marginTop: 20,
  },
  controller: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  playBtn: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: FontFamily.SFProRoundedSemibold,
  },
  icon: {
    resizeMode: 'contain',
  },
  icons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.Background1,
  },
  iconContainer: {
    flex: 1,
  },
  banner: {
    marginTop: 10,
  },
});
