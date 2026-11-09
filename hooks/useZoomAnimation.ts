import {
  interpolateColor,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export default function useZoomAnimation() {
  const scale = useSharedValue(1);
  const progressColor = useSharedValue(0);

  const handlePressIn = () => {
    scale.value = withSpring(1.02, {
      reduceMotion: ReduceMotion.Never,
    });
    progressColor.value = withSpring(1, {
      reduceMotion: ReduceMotion.Never,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      reduceMotion: ReduceMotion.Never,
    });
    progressColor.value = withSpring(0, {
      reduceMotion: ReduceMotion.Never,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: interpolateColor(
      progressColor.value,
      [0, 1],
      ['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)']
    ),
  }));
  return {
    animatedStyle,
    handlePressIn,
    handlePressOut,
  };
}
