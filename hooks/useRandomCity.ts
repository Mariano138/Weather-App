import { useState } from 'react';
import { randomCities } from '@/constants/randomCities';

export default function useRandomCity() {
  const [index] = useState(() => Math.floor(Math.random() * randomCities.length));
  return randomCities[index];
}
