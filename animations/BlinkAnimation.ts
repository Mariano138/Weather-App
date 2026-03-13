import { CSSAnimationKeyframes } from 'react-native-reanimated';

export const BlinkAnimation: CSSAnimationKeyframes = {
  '0%': { opacity: 1 },
  '50%': { opacity: 0 },
  '100%': { opacity: 1 },
};
