import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface WeatherStore {
  weather: any | null;
  city: string;
  isLoading: boolean;
  error: string | null;

  setCity: (city: string) => void;
  fetchWeather: (cityToFetch?: string) => void;
  getDayName: (dt: number, index: number) => string;
  loadCity: () => Promise<void>;
}

export const useWeatherStore = create<WeatherStore>((set, get) => ({
  weather: null,
  city: '',
  isLoading: false,
  error: null,

  setCity: (city) => set({ city }),

  loadCity: async () => {
    const savedCity = await AsyncStorage.getItem('saveCity');
    if (savedCity) {
      set({ city: savedCity });
      await get().fetchWeather(savedCity);
    }
  },

  getDayName: (dt, index) => {
    const date = new Date(dt * 1000);
    // if (index === 0) return 'Mañana';
    const day = date.toLocaleDateString('es-ES', { weekday: 'short' });
    const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

    return capitalize(day);
  },

  fetchWeather: async (cityToFetch) => {
    const query = cityToFetch ?? get().city;
    if (!query.trim()) return;

    try {
      set({ isLoading: true, error: null });

      const response = await fetch(
        `https://weather-app-hazel-beta-59.vercel.app/api/weather?city=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data.cod && data.cod !== '200') {
        set({ error: 'Ciudad no encontrada' });
        set({ weather: null });
        set({ isLoading: false });
        return;
      } else {
        set({ weather: data });
        await AsyncStorage.setItem('savedCity', query);
      }
    } catch (err) {
      set({ error: 'Error de conexión' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
