import { useState } from 'react';
import * as Location from 'expo-location';
import { fetchWeather } from '@/services/weather';
import { router } from 'expo-router';

export default function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});

      setLocation(currentLocation);

      const address = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (address.length > 0 && address[0].city) {
        const city = address[0].city;
        await fetchWeather(city);
        router.navigate({
          pathname: '/weather',
          params: {
            city: city,
          },
        });
      }
    } catch (error) {
      setErrorMsg('Unable to get your location');
    } finally {
      setIsLoading(false);
    }
  };

  return { location, errorMsg, isLoading, getLocation };
}
