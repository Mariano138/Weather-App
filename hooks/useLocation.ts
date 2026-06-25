import { useState } from 'react';
import * as Location from 'expo-location';
import { useWeatherStore } from 'store/weatherStore';

export default function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { fetchWeather } = useWeatherStore();

  const getLocation = async () => {
    console.log('getLocation ejecutándose');

    try {
      console.log('pidiendo permisos');

      let { status } = await Location.requestForegroundPermissionsAsync();

      console.log('status:', status);

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      console.log('obteniendo ubicación');

      let currentLocation = await Location.getCurrentPositionAsync({});

      setLocation(currentLocation);
      console.log('LOCATION:', currentLocation);

      const adress = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (adress.length > 0 && adress[0].city) {
        const city = adress[0].city;
        await fetchWeather(city);
      }
    } catch (error) {
      console.log('ERROR:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { location, errorMsg, isLoading, getLocation };
}
