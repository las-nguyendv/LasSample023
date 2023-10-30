import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Colors, FontFamily } from '../common/styles';
import {
  BottomSheetBackdropProps,
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import CustomBackdrop from './CustomBackdrop';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Media, MixRawData } from '../common/types';
import MixItem from './MixItem';

interface FooterProps extends BottomSheetFooterProps {
  onClose: () => void;
  onSave: () => void;
}

const Footer: FC<FooterProps> = ({ animatedFooterPosition, onClose, onSave }) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <BottomSheetFooter bottomInset={bottom} animatedFooterPosition={animatedFooterPosition}>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton1} onPress={onClose}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton2} onPress={onSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetFooter>
  );
};

interface ContentProps {
  medias?: Media[];
  onChangeVolume: (media: string, val: number) => void;
}
const ModalContent: FC<ContentProps> = ({ medias, onChangeVolume }) => {
  if (!medias) {
    return null;
  }
  return (
    <View style={styles.list}>
      {medias.map(media => {
        const _onChange = (val: number) => onChangeVolume(media.name, val);
        return <MixItem item={media} onChangeVolume={_onChange} key={media.name} />;
      })}
    </View>
  );
};

interface Props {
  medias?: Media[];
  onSave: (data: MixRawData[]) => void;
}

const PlayerEditModal: FC<Props> = ({ medias, onSave }) => {
  const modalRef = useRef<BottomSheetModal>(null);

  const [volumes, setVolumes] = useState<{ [key: string]: number }>({});

  const onOpenModal = useCallback(() => {
    modalRef.current?.present();
  }, []);

  const onCloseModal = useCallback(() => {
    modalRef.current?.dismiss();
  }, []);

  const _onSave = useCallback(() => {
    if (!medias) {
      return;
    }
    const data: MixRawData[] = medias.map(el => ({
      name: el.name,
      type: el.type,
      volume: volumes[el.name] !== undefined ? volumes[el.name] : 0.5,
    }));
    onSave(data);
    onCloseModal();
  }, [onSave, volumes, medias, onCloseModal]);

  const renderFooter = useCallback(
    (_props: BottomSheetFooterProps) => {
      return <Footer {..._props} onClose={onCloseModal} onSave={_onSave} />;
    },
    [onCloseModal, _onSave],
  );

  const onChangeVolume = useCallback(
    (name: string, val: number) => {
      const data = {
        ...volumes,
        [name]: Number(val.toFixed(1)),
      };
      setVolumes(data);
    },
    [volumes],
  );

  return (
    <>
      <TouchableOpacity onPress={onOpenModal}>
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
      <BottomSheetModal
        snapPoints={['40%', '80%']}
        ref={modalRef}
        backgroundStyle={styles.background}
        backdropComponent={(xProps: BottomSheetBackdropProps) => <CustomBackdrop {...xProps} />}
        footerComponent={renderFooter}
        handleComponent={null}>
        <View style={styles.content}>
          <Text style={styles.title}>Custom</Text>
          <View style={styles.content2}>
            <ModalContent medias={medias} onChangeVolume={onChangeVolume} />
          </View>
        </View>
      </BottomSheetModal>
    </>
  );
};

export default PlayerEditModal;

const styles = StyleSheet.create({
  editText: {
    color: Colors.Active,
    fontSize: 16,
    fontFamily: FontFamily.SFProRoundedBold,
  },
  title: {
    fontSize: 17,
    color: 'white',
    fontFamily: FontFamily.SFProRoundedBold,
  },
  background: {
    backgroundColor: '#16182B',
  },
  content: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  footerButton1: {
    height: 42,
    width: 126,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 26,
  },
  footerButton2: {
    height: 42,
    width: 126,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Active,
    borderRadius: 26,
  },
  cancelText: {
    color: '#fff',
    fontFamily: FontFamily.SFProRoundedBold,
    fontSize: 16,
  },
  saveText: {
    color: '#000000',
    fontFamily: FontFamily.SFProRoundedBold,
    fontSize: 16,
  },
  list: {
    gap: 8,
    paddingRight: 20,
  },
  content2: {
    flex: 1,
    paddingTop: 10,
  },
});
