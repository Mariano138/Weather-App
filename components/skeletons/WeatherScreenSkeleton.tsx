import { useState } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';

export default function WeatherScreenSkeleton() {
  // On web, useWindowDimensions returns the browser window, not the phone
  // frame the app is rendered in, so the loader has to measure its container.
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    const { width, height } = nativeEvent.layout;
    setSize((current) =>
      current.width === width && current.height === height ? current : { width, height }
    );
  };

  return (
    <View style={styles.container} onLayout={handleLayout}>
      {size.width > 0 && size.height > 0 && (
        <ContentLoader
          speed={0.8}
          width={size.width}
          height={size.height}
          viewBox={`0 0 ${size.width} ${size.height}`}
          backgroundColor="#cfcfc7"
          foregroundColor="#ecebeb">
          <Rect x={16} y={23} rx="20" ry="20" width={size.width - 32} height="84" />

          <Rect x={16} y={117} rx="20" ry="20" width={size.width - 32} height="285" />

          <Rect x={16} y={412} rx="20" ry="20" width={size.width - 32} height="90" />

          <Rect x={16} y={512} rx="20" ry="20" width={size.width - 32} height="90" />

          <Rect x={16} y={612} rx="20" ry="20" width={size.width - 32} height="90" />

          <Rect x={16} y={712} rx="20" ry="20" width={size.width - 32} height="90" />

          <Rect x={16} y={812} rx="20" ry="20" width={size.width - 32} height="90" />
        </ContentLoader>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
