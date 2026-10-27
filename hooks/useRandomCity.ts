import { useEffect, useState } from 'react';

export default function useRandomCity() {
  const cities = [
    // Europe
    'London',
    'París',
    'Madrid',
    'Roma',
    'Berlín',
    'Ámsterdam',
    'Lisboa',
    'Manchester',
    'Barcelona',
    'Estocolmo',

    // Latin America
    'Buenos Aires',
    'Mendoza',
    'Córdoba',
    'Santiago',
    'Montevideo',
    'São Paulo',
    'Río de Janeiro',
    'Lima',
    'Bogotá',
    'México',

    // North America
    'New York',
    'Los Ángeles',
    'Chicago',
    'Miami',
    'Toronto',
    'Vancouver',
    'Nashville',
    'San Francisco',

    // Asia
    'Tokio',
    'Seúl',
    'Bangkok',
    'Singapur',
    'Dubái',
    'Hong Kong',

    // Oceanía
    'Sídney',
    'Auckland',

    // África
    'Ciudad del Cabo',
    'El Cairo',
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(Math.floor(Math.random() * cities.length));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return cities[index];
}
