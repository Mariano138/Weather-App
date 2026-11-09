import { Image, StyleSheet, Text, View } from 'react-native';
import { WeatherInterface } from '@/types/weather';
import formatTemperature from '@/utils/formatTemperature';
import capitalize from '@/utils/capitalize';
import Animated from 'react-native-reanimated';
import slideAnimation from '@/animations/slide';
import useZoomAnimation from '@/hooks/useZoomAnimation';
import { useTranslation } from 'react-i18next';

interface Props {
  weather: WeatherInterface;
}

export default function CurrentWeatherCard({ weather }: Props) {
  const { animatedStyle, handlePressIn, handlePressOut } = useZoomAnimation();
  const { t } = useTranslation();

  return (
    <Animated.View
      style={[styles.container, animatedStyle]}
      onTouchStart={handlePressIn}
      onTouchEnd={handlePressOut}>
      <Text style={[styles.cityName, styles.textShadow]}>{weather.current.name}</Text>

      <View style={styles.line}></View>

      <View style={styles.mainView}>
        <View style={styles.mainTempContainer}>
          <Text style={[styles.mainTempText, styles.textShadow]}>
            {formatTemperature(weather.current.main.temp)}°
          </Text>
          <Text style={[styles.feelLikeText, styles.textShadow]}>
            {t('forecast.feelsLike')} {formatTemperature(weather.current.main.feels_like)}°C
          </Text>
        </View>
        <Animated.View
          style={[
            styles.iconContainer,
            {
              animationName: slideAnimation,
              animationIterationCount: 'infinite',
              animationDuration: '15s',
              animationTimingFunction: 'linear',
            },
          ]}>
          <Image
            resizeMode="contain"
            style={styles.icon}
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`,
            }}
          />
        </Animated.View>
      </View>

      <View style={styles.line}></View>

      <View style={styles.humidityContainer}>
        <Text style={[styles.secondaryText, styles.textShadow]}>
          {capitalize(weather.current.weather[0].description)}
        </Text>
        <View style={styles.verticalLine} />
        <Text style={[styles.secondaryText, styles.textShadow]}>
          {t('forecast.humidity')}: {weather.current.main.humidity}%
        </Text>
      </View>

      <View style={styles.line} />

      <View style={styles.humidityContainer}>
        <Text style={[styles.secondaryText, styles.textShadow]}>
          {t('forecast.max')}: {formatTemperature(weather.current.main.temp_max)}°C
        </Text>
        <View style={styles.verticalLine} />
        <Text style={[styles.secondaryText, styles.textShadow]}>
          {t('forecast.min')}: {formatTemperature(weather.current.main.temp_min)}°C
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  cityName: {
    textAlign: 'center',
    fontSize: 30,
    color: '#ffffff',
    fontWeight: '500',
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mainTempContainer: {
    justifyContent: 'center',
  },
  mainTempText: {
    alignSelf: 'center',
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff',
  },
  feelLikeText: {
    alignSelf: 'center',
    color: '#fff',
  },
  iconContainer: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 150,
    height: 150,
  },
  humidityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  secondaryText: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
  },
  line: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  verticalLine: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 1,
    height: '80%',
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  textShadow: {
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
