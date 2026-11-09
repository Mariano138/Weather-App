import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const cities = {
  es: [
    'Londres',
    'París',
    'Madrid',
    'Roma',
    'Berlín',
    'Ámsterdam',
    'Lisboa',
    'Manchester',
    'Barcelona',
    'Buenos Aires',
    'Mendoza',
    'Córdoba',
    'Santiago',
    'Montevideo',
    'São Paulo',
    'Río de Janeiro',
    'Lima',
    'Bogotá',
    'Ciudad de México',
    'Nueva York',
    'Los Ángeles',
    'Chicago',
    'Miami',
    'Toronto',
    'Vancouver',
    'Nashville',
    'San Francisco',
    'Tokio',
    'Seúl',
    'Bangkok',
    'Singapur',
    'Dubái',
    'Hong Kong',
    'Sídney',
    'Auckland',
  ],
  en: [
    'London',
    'Paris',
    'Madrid',
    'Rome',
    'Berlin',
    'Amsterdam',
    'Lisbon',
    'Manchester',
    'Barcelona',
    'Buenos Aires',
    'Mendoza',
    'Cordoba',
    'Santiago',
    'Montevideo',
    'Sao Paulo',
    'Rio de Janeiro',
    'Lima',
    'Bogota',
    'Mexico City',
    'New York',
    'Los Angeles',
    'Chicago',
    'Miami',
    'Toronto',
    'Vancouver',
    'Nashville',
    'San Francisco',
    'Tokyo',
    'Seoul',
    'Bangkok',
    'Singapore',
    'Dubai',
    'Hong Kong',
    'Sydney',
    'Auckland',
  ],
};

export default function useRotatingCity() {
  const { i18n } = useTranslation();

  const language = i18n.resolvedLanguage?.startsWith('en') ? 'en' : 'es';

  const currentCities = cities[language];

  const [rotation, setRotation] = useState({ language, index: 0 });
  const index = rotation.language === language ? rotation.index : 0;

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation({
        language,
        index: Math.floor(Math.random() * currentCities.length),
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [language, currentCities]);

  return currentCities[index];
}
