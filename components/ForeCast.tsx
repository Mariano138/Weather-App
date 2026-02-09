import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useWeatherStore } from 'store/weatherStore';
import ForecastInterface from 'interface/forecastInterface';
import formatTemp from 'helpers/formatTemp';
import { BlurView } from 'expo-blur';

export default function ForeCast() {
  const { weather, getDayName } = useWeatherStore();
  return (
    <BlurView style={styles.blurBackground}>
      {weather.forecast.map((item: ForecastInterface, index: number) => (
        <BlurView key={index} style={styles.container}>
          <Text>{getDayName(item.dt, index)}</Text>
          <Image
            resizeMode="contain"
            style={styles.icon}
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`,
            }}
          />
          <Text>Max: {formatTemp(item.main.temp_max)}°C</Text>
          <Text>Min: {formatTemp(item.main.temp_min)}°C</Text>
        </BlurView>
      ))}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blurBackground: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    margin: 16,
    overflow: 'hidden',
    borderRadius: 20,
  },
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
  },
  icon: {
    width: 50,
    height: 50,
  },
});
