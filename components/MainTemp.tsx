import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import WeatherInterface from 'interface/weatherInterface';
import formatTemp from 'helpers/formatTemp';
import { useWeatherStore } from 'store/weatherStore';

interface Props {
  weather: WeatherInterface;
}

export default function MainTemp({ weather }: Props) {
  const { capitalizeFirstLetter } = useWeatherStore();
  return (
    <View style={styles.container}>
      <Text style={[styles.cityName, styles.textShadow]}>{weather.current.name}</Text>

      <View style={styles.line}></View>

      <View style={styles.mainView}>
        <View style={styles.mainTempContainer}>
          <Text style={[styles.mainTempText, styles.textShadow]}>
            {formatTemp(weather.current.main.temp)}°
          </Text>
          <Text style={[styles.feelLikeText, styles.textShadow]}>
            Sensación {formatTemp(weather.current.main.feels_like)}°C
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <Image
            resizeMode="contain"
            style={styles.icon}
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`,
            }}
          />
        </View>
      </View>

      <View style={styles.line}></View>

      <View style={styles.humidityContainer}>
        <Text style={[styles.secondaryText, styles.textShadow]}>
          {capitalizeFirstLetter(weather.current.weather[0].description)}
        </Text>
        <View style={styles.verticalLine} />
        <Text style={[styles.secondaryText, styles.textShadow]}>
          Humedad: {weather.current.main.humidity}%
        </Text>
      </View>

      <View style={styles.line} />

      <View style={styles.humidityContainer}>
        <Text style={[styles.secondaryText, styles.textShadow]}>
          Max: {formatTemp(weather.current.main.temp_max)}°C
        </Text>
        <View style={styles.verticalLine} />
        <Text style={[styles.secondaryText, styles.textShadow]}>
          Min: {formatTemp(weather.current.main.temp_min)}°C
        </Text>
      </View>
    </View>
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
    backgroundColor: 'rgba(0,0,0,0.25)',
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
  blurBackground: {
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 10,
    overflow: 'hidden',
    borderRadius: 20,
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
