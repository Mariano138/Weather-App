import React from 'react';
import { useWeatherStore } from 'store/weatherStore';
import { ForecastItem } from 'interface/weatherInterface';
import { View } from 'react-native';
import ForecastCard from './ForecastCard';

export default function Forecast() {
  const { weather } = useWeatherStore();

  return (
    <View style={{ gap: 10 }}>
      {weather?.forecast.map((item: ForecastItem, index: number) => (
        <ForecastCard item={item} index={index} />
      ))}
    </View>
  );
}
