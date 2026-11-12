import { router } from 'expo-router';
import slideAnimation from '@/animations/slide';
import useZoomAnimation from '@/hooks/useZoomAnimation';
import capitalize from '@/utils/capitalize';
import formatTemperature from '@/utils/formatTemperature';
import useRandomCity from '@/hooks/useRandomCity';
import { fetchWeather } from '@/services/weatherApi';
import { useQuery } from '@tanstack/react-query';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import CityCardSkeleton from '@/components/skeletons/CityCardSkeleton';

export default function CityCard() {
  const city = useRandomCity();
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? i18n.language;
  const { animatedStyle, handlePressIn, handlePressOut } = useZoomAnimation();

  const {
    isPending,
    error,
    data: weather,
  } = useQuery({
    queryKey: ['weather', city, language],
    queryFn: () => fetchWeather(city, language),
    enabled: !!city,
  });

  if (isPending)
    return (
      <View style={{ flex: 1 }}>
        <CityCardSkeleton />
      </View>
    );

  if (error) return <Text>{`${city}: ${error.message}`}</Text>;

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => {
        if (!city.trim()) return;
        router.navigate({
          pathname: '/weather',
          params: {
            city: city,
          },
        });
      }}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.textContainer}>
          <Text style={[styles.textTemp, styles.textShadow]}>
            {formatTemperature(weather.current.main.temp)}°
          </Text>
          <View>
            <Text style={[styles.textSecondary, styles.textShadow]}>{weather.current.name}</Text>
            <Text style={[styles.textDescription, styles.textShadow]}>
              {capitalize(weather.current.weather[0].description)}
            </Text>
          </View>
        </View>
        <Animated.View
          dataSet={{ weatherSlide: 'true' }}
          style={[
            {
              animationName: slideAnimation,
              animationIterationCount: 'infinite',
              animationDuration: '30s',
              animationTimingFunction: 'linear',
            },
          ]}>
          <Image
            resizeMode="cover"
            style={styles.icon}
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`,
            }}
          />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  textContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  icon: {
    width: 150,
    height: 150,
  },
  textTemp: {
    textAlign: 'left',
    fontSize: 40,
    color: '#ffffff',
    fontWeight: '500',
  },
  textSecondary: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '500',
  },
  textDescription: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  textShadow: {
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
