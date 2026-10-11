import i18next from 'i18next';

export async function fetchWeather(city: string) {
  if (!city.trim()) return;

  const language = i18next.language === 'en' ? 'en' : 'es';

  const response = await fetch(
    `https://weather-app-hazel-beta-59.vercel.app/api/weather?city=${encodeURIComponent(city)}&lang=${language}`
  );

  if (!response.ok) {
    throw new Error('City not found');
  }

  const data = await response.json();

  return data;
}
