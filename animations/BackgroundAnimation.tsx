import { useEffect, useState } from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type Props = {
  source: ImageSourcePropType;
};

export default function BackgroundAnimation({ source }: Props) {
  const [current, setCurrent] = useState(source);
  const [next, setNext] = useState<ImageSourcePropType | null>(null);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (source === current) return;

    setNext(source);
    opacity.value = 0;

    opacity.value = withTiming(1, { duration: 1500 });

    const timeout = setTimeout(() => {
      setCurrent(source);
      setNext(null);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [source]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.Image
        source={current}
        resizeMode="cover"
        style={[StyleSheet.absoluteFill, styles.background]}
      />
      {next && (
        <Animated.Image
          source={next}
          resizeMode="cover"
          style={[StyleSheet.absoluteFill, animatedStyle, styles.background]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
});
