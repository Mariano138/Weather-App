import { randomCities } from '@/constants/randomCities';

export default function pickRandomCities(
  count: number,
  pool: readonly string[] = randomCities
): string[] {
  const candidates = [...pool];
  const limit = Math.max(0, Math.min(Math.floor(count), candidates.length));

  for (let index = candidates.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [candidates[index], candidates[swapIndex]] = [candidates[swapIndex], candidates[index]];
  }

  return candidates.slice(0, limit);
}
