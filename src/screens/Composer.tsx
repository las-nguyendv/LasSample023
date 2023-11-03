import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useCallback } from 'react';
import Layout from '../components/Layout';
import HeaderLayout from '../components/HeaderLayout';
import { Colors, FontFamily } from '../common/styles';
import { Icon } from '@rneui/themed';
import Slider from '@react-native-community/slider';
import WhiteNoiseList from '../components/WhiteNoiseList';
import { AmbienceData, AnimalData, NatureData } from '../common/data';
import { Media } from '../common/types';
import { usePlayContext } from '../provider/PlayProvider';
import { useSavedMix } from '../hooks/useSavedMix';
import { AdsBanner } from 'ads';

const Composer: FC = () => {
  const { togglePlay, isPlaying, playingType, medias } = usePlayContext();

  const { saveMix } = useSavedMix();

  const onPressMedia = useCallback((item: Media) => {
    try {
    } catch (error) {}
  }, []);

  const onSave = useCallback(() => {
    try {
      return Alert.prompt(
        'Save Mix',
        'Enter name',
        (text: string) => {
          saveMix(text, medias);
        },
        'plain-text',
        '',
        'default',
        {
          // userInterfaceStyle: 'dark',
        },
      );
    } catch (error) {
      console.log('onSave error', error);
    }
  }, [medias]);

  return (
    <Layout>
      <HeaderLayout contentStyle={styles.headerContent}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Composer</Text>
          <TouchableOpacity style={styles.saveButton} onPress={onSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerRow2}>
          <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
            <Icon
              name={isPlaying && playingType === 'composer' ? 'pause' : 'play'}
              type="ionicon"
              color={'#000'}
              size={20}
            />
          </TouchableOpacity>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor={Colors.Active}
            maximumTrackTintColor="#FFFFFF2B"
          />
          <TouchableOpacity>
            <Icon name="clock" type="feather" color={'#fff'} size={30} />
          </TouchableOpacity>
        </View>
      </HeaderLayout>
      <ScrollView style={styles.content}>
        <AdsBanner />
        <WhiteNoiseList title="Ambience" data={AmbienceData} onPressItem={onPressMedia} />
        <WhiteNoiseList
          title="Nature"
          subTitle="It will allow you to merge with nature"
          data={NatureData}
          onPressItem={onPressMedia}
        />
        <WhiteNoiseList
          title="Animals"
          subTitle="Animal voices will improve your sleep"
          data={AnimalData}
          onPressItem={onPressMedia}
        />
      </ScrollView>
    </Layout>
  );
};

export default Composer;

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 28,
    fontFamily: FontFamily.SFProRoundedBold,
    marginLeft: 22.5,
  },
  headerContent: {
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 15,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    width: 56,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.Active,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  saveText: {
    fontFamily: FontFamily.SFProRoundedBold,
    fontSize: 14,
    color: Colors.Active,
  },
  headerRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    height: 32,
    paddingHorizontal: 20,
  },
  slider: {
    flex: 1,
    height: 20,
    marginHorizontal: 10,
  },
  content: {
    width: '100%',
    paddingTop: 20,
  },
});
