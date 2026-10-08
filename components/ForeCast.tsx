import WeatherInterface, { ForecastItem } from '@/interface/weatherInterface';
import { View } from 'react-native';
import ForecastCard from '@/components/ForecastCard';

interface Props {
  weather: WeatherInterface;
}

export default function Forecast({ weather }: Props) {
  return (
    <View style={{ gap: 10 }}>
      {weather?.forecast.map((item: ForecastItem, index: number) => (
        <ForecastCard key={index} item={item} index={index} />
      ))}
    </View>
  );
}
