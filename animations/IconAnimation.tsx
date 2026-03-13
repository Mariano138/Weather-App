import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

type Props = {
  name: React.ComponentProps<typeof Feather>['name'];
  size?: number;
  color?: string;
};

export default function IconAnimation({ name, size = 75, color = 'white' }: Props) {
  const [current, setCurrent] = useState(name);

  const opacity = useSharedValue(1);

  useEffect(() => {
    if (name === current) return;

    opacity.value = withTiming(0, { duration: 500 });

    const timeout = setTimeout(() => {
      setCurrent(name);

      opacity.value = withTiming(1, { duration: 500 });
    }, 500);

    return () => clearTimeout(timeout);
  }, [name]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Feather style={styles.textShadow} name={current} size={size} color={color} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  textShadow: {
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
