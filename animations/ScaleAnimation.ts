import { ImageStyle } from 'react-native';
import { CSSAnimationKeyframes } from 'react-native-reanimated';

const scale: CSSAnimationKeyframes<ImageStyle> = {
  from: {
    transform: [{ scale: 1 }],
  },
  to: {
    transform: [{ scale: 1.1 }],
  },
};

export default scale;
