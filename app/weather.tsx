import CityNotFound from '@/components/CityNotFound';
import Forecast from '@/components/ForeCast';
import MainTemp from '@/components/MainTemp';
import SearchBar from '@/components/SearchBar';
import SkeletonLoader from '@/components/SkeletonLoader';
import getBackground from '@/helpers/getBackground';
import { fetchWeather } from '@/services/weather';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function weather() {
  const { city } = useLocalSearchParams<{ city: string }>();

  const { isPending, error, data } = useQuery({
    queryKey: ['weather', city],
    queryFn: () => fetchWeather(city),
    enabled: !!city,
  });

  if (isPending) return <SkeletonLoader />;

  if (error) return <CityNotFound city={city} />;

  return (
    <ImageBackground source={getBackground(data)} resizeMode="cover" style={styles.imageBackground}>
      <SafeAreaView>
        <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
          <SearchBar />
          <MainTemp weather={data} />
          <Forecast weather={data} />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  container: {
    paddingTop: 10,
  },
});
