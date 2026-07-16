import {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

export default function PopAnimation() {
  const scale = useSharedValue<number>(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.8, {
      reduceMotion: ReduceMotion.Never,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      reduceMotion: ReduceMotion.Never,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return { animatedStyle, handlePressIn, handlePressOut };
}
