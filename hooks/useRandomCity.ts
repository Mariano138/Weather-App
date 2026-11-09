import { useState } from 'react';

const cities = [
  // Europe
  'London',
  'Paris',
  'Madrid',
  'Rome',
  'Berlin',
  'Amsterdam',
  'Lisbon',
  'Manchester',
  'Barcelona',

  // Latin America
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

  // North America
  'New York',
  'Los Angeles',
  'Chicago',
  'Miami',
  'Toronto',
  'Vancouver',
  'Nashville',
  'San Francisco',

  // Asia
  'Tokyo',
  'Seoul',
  'Bangkok',
  'Singapore',
  'Dubai',
  'Hong Kong',

  // Oceania
  'Sydney',
  'Auckland',
];

export default function useRandomCity() {
  const [index] = useState(() => Math.floor(Math.random() * cities.length));
  return cities[index];
}
