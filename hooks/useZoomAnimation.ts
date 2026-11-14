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
      reduceMotion: ReduceMotion.System,
    });
    progressColor.value = withSpring(1, {
      reduceMotion: ReduceMotion.System,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      reduceMotion: ReduceMotion.System,
    });
    progressColor.value = withSpring(0, {
      reduceMotion: ReduceMotion.System,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    backgroundColor: interpolateColor(
      progressColor.value,
      [0, 1],
      ['rgba(0,0,0,0.40)', 'rgba(0,0,0,0.60)']
    ),
  }));
  return {
    animatedStyle,
    handlePressIn,
    handlePressOut,
  };
}
