import { Image, StyleSheet, Text, View } from 'react-native';
import useZoomAnimation from '@/hooks/useZoomAnimation';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import formatTemperature from '@/utils/formatTemperature';
import { ForecastItem } from '@/types/weather';
import getDayName from '@/utils/getDayName';
import getDateNumber from '@/utils/getDateNumber';
import capitalize from '@/utils/capitalize';

export default function ForecastCard({ item, index }: { item: ForecastItem; index: number }) {
  const { animatedStyle, handlePressIn, handlePressOut } = useZoomAnimation();

  return (
    <Animated.View
      key={index}
      style={[styles.container, animatedStyle]}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}>
      <View style={styles.leftContainer}>
        <View style={styles.dateContainer}>
          <Text style={[styles.textShadow, { color: '#fff' }]}>{getDayName(item.dt)}</Text>
          <Text style={[styles.textShadow, { color: '#fff' }]}>{getDateNumber(item.dt)}</Text>
        </View>

        <View style={styles.iconContainer}>
          <Image
            resizeMode="contain"
            style={styles.icon}
            source={{
              uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
            }}
          />
          <Text style={[{ fontSize: 20, color: '#fff' }, styles.textShadow]}>
            {formatTemperature(item.main.temp_max)}°
          </Text>
          <Text style={[styles.textShadow, { color: '#fff' }]}>
            {formatTemperature(item.main.temp_min)}°
          </Text>
        </View>
      </View>
      <View>
        <Text style={[styles.textShadow, { color: '#fff' }]}>{item.weather[0].main}</Text>
        <Text style={[styles.textShadow, { color: '#fff' }]}>
          {capitalize(item.weather[0].description)}
        </Text>
      </View>
      <View style={{ justifyContent: 'center' }}>
        <Text style={[styles.textShadow, { color: '#fff' }]}>
          <Ionicons name="water-outline" size={24} color="white" />
          {item.main.humidity}%
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  dateContainer: {
    justifyContent: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
  textShadow: {
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
