import ContentLoader, { Rect } from 'react-content-loader/native';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

export default function CityCardSkeleton() {
  const { width } = useWindowDimensions();
  const cardWidth = width - 32;

  return (
    <View style={styles.container}>
      <View style={{ width: cardWidth, height: 150 }}>
        <ContentLoader
          width={cardWidth}
          height={150}
          viewBox={`0 0 ${cardWidth} 150`}
          speed={0.8}
          backgroundColor="#000000"
          backgroundOpacity={0.5}
          foregroundColor="#000000"
          foregroundOpacity={0.7}>
          <Rect x={0} y={0} rx={20} ry={20} width={cardWidth} height={150} />
        </ContentLoader>
        <View style={styles.border} pointerEvents="none" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  border: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
});
