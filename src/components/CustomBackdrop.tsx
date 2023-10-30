import React, { FC, useMemo } from 'react';
import { BottomSheetBackdropProps, useBottomSheetModal } from '@gorhom/bottom-sheet';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { Pressable } from 'react-native';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface IProps {}

type Props = IProps & BottomSheetBackdropProps;

const CustomBackdrop: FC<Props> = ({ animatedIndex, style }) => {
  const { dismissAll } = useBottomSheetModal();
  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedIndex.value, [-1, 0], [0, 0.7], Extrapolate.CLAMP),
    };
  });

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: 'black',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  return <AnimatedPressable style={containerStyle} onPress={dismissAll} />;
};

export default CustomBackdrop;
