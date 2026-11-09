import CityNotFound from '@/components/weather/CityNotFound';
import ForecastList from '@/components/weather/ForecastList';
import CurrentWeatherCard from '@/components/weather/CurrentWeatherCard';
import SearchBar from '@/components/common/SearchBar';
import WeatherScreenSkeleton from '@/components/skeletons/WeatherScreenSkeleton';
import getWeatherBackground from '@/utils/getWeatherBackground';
import { fetchWeather } from '@/services/weatherApi';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function Weather() {
  const { city } = useLocalSearchParams<{ city: string }>();
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? i18n.language;

  const {
    isPending,
    error,
    data: weather,
  } = useQuery({
    queryKey: ['weather', city, language],
    queryFn: () => fetchWeather(city, language),
    enabled: !!city,
  });

  if (isPending) return <WeatherScreenSkeleton />;

  if (error) return <CityNotFound city={city} />;

  return (
    <ImageBackground
      source={getWeatherBackground(weather)}
      resizeMode="cover"
      blurRadius={5}
      style={styles.imageBackground}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <SearchBar />
        <CurrentWeatherCard weather={weather} />
        <ForecastList weather={weather} />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
