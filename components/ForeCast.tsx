import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useWeatherStore } from 'store/weatherStore';
import formatTemp from 'helpers/formatTemp';
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ForecastItem } from 'interface/weatherInterface';

export default function ForeCast() {
  const { weather, getDayName, getDateNumber, capitalizeFirstLetter } = useWeatherStore();
  return (
    <View style={{ gap: 10 }}>
      {weather?.forecast.map((item: ForecastItem, index: number) => (
        <BlurView
          key={index}
          intensity={10}
          experimentalBlurMethod="dimezisBlurView"
          tint="dark"
          style={styles.blurBackground}>
          <View style={styles.leftContainer}>
            <View style={styles.dateContainer}>
              <Text style={[styles.textShadow, { color: '#fff' }]}>
                {getDayName(item.dt, index)}
              </Text>
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
                {formatTemp(item.main.temp_max)}°
              </Text>
              <Text style={[styles.textShadow, { color: '#fff' }]}>
                {formatTemp(item.main.temp_min)}°
              </Text>
            </View>
          </View>
          <View>
            <Text style={[styles.textShadow, { color: '#fff' }]}>{item.weather[0].main}</Text>
            <Text style={[styles.textShadow, { color: '#fff' }]}>
              {capitalizeFirstLetter(item.weather[0].description)}
            </Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text style={[styles.textShadow, { color: '#fff' }]}>
              <Ionicons name="water-outline" size={24} color="white" />
              {item.main.humidity}%
            </Text>
          </View>
        </BlurView>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  blurBackground: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginHorizontal: 16,
    overflow: 'hidden',
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
