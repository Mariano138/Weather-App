import { useState } from 'react';
import pickRandomCities from '@/utils/pickRandomCities';

export default function useRandomCities(count: number) {
  const [cities] = useState(() => pickRandomCities(count));
  return cities;
}
