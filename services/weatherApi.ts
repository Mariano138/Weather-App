import { WeatherInterface } from '@/types/weather';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://weather-app-hazel-beta-59.vercel.app';

export async function fetchWeather(city: string, language: string): Promise<WeatherInterface> {
  if (!city.trim()) {
    throw new Error('City is required');
  }

  const apiLanguage = language.startsWith('en') ? 'en' : 'es';

  const response = await fetch(
    `${API_URL}/api/weather?city=${encodeURIComponent(city)}&lang=${apiLanguage}`
  );

  if (!response.ok) {
    throw new Error('City not found');
  }

  const data = (await response.json()) as WeatherInterface;

  return data;
}
