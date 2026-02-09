import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import WeatherInterface from 'interface/weatherInterface';
import { BlurView } from 'expo-blur';
import formatTemp from 'helpers/formatTemp';

export default function MainTemp({ weather }: WeatherInterface) {
  return (
    <View style={styles.container}>
      <BlurView intensity={80} style={styles.blurBackground}>
        <Text style={styles.cityName}>{weather.current.name}</Text>

        <View style={styles.line}></View>

        <View style={styles.mainView}>
          <View style={styles.mainTempContainer}>
            <Text style={styles.mainTempText}>{formatTemp(weather.current.main.temp)}°</Text>
            <Text style={styles.feelLikeText}>
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
          <Text style={styles.secondaryText}>{weather.current.weather[0].description}</Text>
          <View style={styles.verticalLine} />
          <Text style={styles.secondaryText}>Humedad: {weather.current.main.humidity}%</Text>
        </View>

        <View style={styles.line} />

        <View style={styles.humidityContainer}>
          <Text style={styles.secondaryText}>
            Min: {formatTemp(weather.current.main.temp_min)}°C
          </Text>
          <View style={styles.verticalLine} />
          <Text style={styles.secondaryText}>
            Max: {formatTemp(weather.current.main.temp_max)}°C
          </Text>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
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
    margin: 16,
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
});
