import { useState } from 'react';
import { Platform } from 'react-native';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

interface WebAddress {
  address?: {
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
  };
}

// expo-location has no reverse geocoder on web, so we resolve the city name
// with OpenStreetMap's Nominatim service instead.
const getWebCity = async (latitude: number, longitude: number, language: string) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=10&accept-language=${language}&lat=${latitude}&lon=${longitude}`
  );

  if (!response.ok) return null;

  const data = (await response.json()) as WebAddress;
  const address = data.address;

  return address?.city ?? address?.town ?? address?.village ?? address?.municipality ?? null;
};

export default function useLocation() {
  const { i18n } = useTranslation();
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

      const { latitude, longitude } = currentLocation.coords;
      const language = i18n.resolvedLanguage ?? i18n.language;

      const city =
        Platform.OS === 'web'
          ? await getWebCity(latitude, longitude, language)
          : (
              await Location.reverseGeocodeAsync({
                latitude,
                longitude,
              })
            )[0]?.city;

      if (city) {
        router.navigate({
          pathname: '/weather',
          params: {
            city: city,
          },
        });
      }
    } catch (error) {
      setErrorMsg('Unable to get your location' + error);
    } finally {
      setIsLoading(false);
    }
  };

  return { location, errorMsg, isLoading, getLocation };
}
