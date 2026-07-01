import { useEffect, useState } from 'react';

export default function useRandomCity() {
  const cities = [
    // Europa
    'Londres',
    'París',
    'Madrid',
    'Roma',
    'Berlín',
    'Ámsterdam',
    'Lisboa',
    'Dublín',
    'Oslo',
    'Estocolmo',

    // Latinoamérica
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

    // Norteamérica
    'Nueva York',
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
    'Mumbai',
    'Pekín',

    // Oceanía
    'Sídney',
    'Melbourne',
    'Auckland',

    // África
    'Ciudad del Cabo',
    'El Cairo',
    'Marrakech',
    'Nairobi',

    // Extras
    'Reikiavik',
    'Helsinki',
    'Honolulu',
    'Reykjavík',
    'Ushuaia',
    'Reikiavik',
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
