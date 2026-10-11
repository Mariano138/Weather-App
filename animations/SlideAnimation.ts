import { CSSAnimationKeyframes } from 'react-native-reanimated';

const slice: CSSAnimationKeyframes = {
  '0%': {
    transform: [{ translateX: -10 }],
  },
  '25%': {
    transform: [{ translateX: 10 }],
  },
  '50%': {
    transform: [{ translateX: -10 }],
  },
  '75%': {
    transform: [{ translateX: 10 }],
  },
  '100%': {
    transform: [{ translateX: -10 }],
  },
};

export default slice;
