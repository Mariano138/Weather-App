import { WeatherInterface, ForecastItem } from '@/types/weather';
import { View } from 'react-native';
import ForecastCard from '@/components/weather/ForecastCard';

interface Props {
  weather: WeatherInterface;
}

export default function ForecastList({ weather }: Props) {
  return (
    <View style={{ gap: 10, marginBottom: 45 }}>
      {weather?.forecast.map((item: ForecastItem, index: number) => (
        <ForecastCard key={index} item={item} index={index} />
      ))}
    </View>
  );
}
