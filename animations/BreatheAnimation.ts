import { CSSAnimationKeyframes } from 'react-native-reanimated';

const breathe: CSSAnimationKeyframes = {
  '0%': {
    transform: [{ scale: 1 }],
  },
  '50%': {
    transform: [{ scale: 1.03 }],
  },
  '100%': {
    transform: [{ scale: 1 }],
  },
};

export default breathe;
