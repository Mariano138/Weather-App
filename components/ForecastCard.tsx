import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ZoomAnimation from 'animations/ZoomAnimation';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useWeatherStore } from 'store/weatherStore';
import formatTemp from 'helpers/formatTemp';
import { ForecastItem } from 'interface/weatherInterface';

export default function ForecastCard({ item, index }: { item: ForecastItem; index: number }) {
  const { getDayName, getDateNumber, capitalizeFirstLetter } = useWeatherStore();
  const { animatedStyle, handlePressIn, handlePressOut } = ZoomAnimation();

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View key={index} style={[styles.container, animatedStyle]}>
        <View style={styles.leftContainer}>
          <View style={styles.dateContainer}>
            <Text style={[styles.textShadow, { color: '#fff' }]}>{getDayName(item.dt, index)}</Text>
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
      </Animated.View>
    </Pressable>
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
    backgroundColor: 'rgba(0,0,0,0.25)',
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
