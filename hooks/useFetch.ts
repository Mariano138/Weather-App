import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useFetch() {
  const [weather, setWeather] = useState<any | null>(null);
  const [city, setCity] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCity = async () => {
      const savedCity = await AsyncStorage.getItem('savedCity');
      if (savedCity) {
        setCity(savedCity);
        fetchWeather(savedCity);
      }
    };
    loadCity();
  }, []);

  const saveCity = async () => {
    await AsyncStorage.setItem('savedCity', city);
  };

  const fetchWeather = async (cityToFetch?: string) => {
    const query = cityToFetch ?? city;
    if (!query.trim()) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `https://weather-app-hazel-beta-59.vercel.app/api/weather?city=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data.cod && data.cod !== 200) {
        setError('Ciudad no encontrada');
        setWeather(null);
      } else {
        setWeather(data);
        saveCity();
      }
    } catch (err) {
      setError('Error de conexión');
    } finally {
      setIsLoading(false);
    }
  };
  return { fetchWeather, city, setCity, isLoading, weather, error };
}
