import { describe, expect, it } from '@jest/globals';
import pickRandomCities from './pickRandomCities';

describe('pickRandomCities', () => {
  const pool = ['London', 'Paris', 'Madrid', 'Rome', 'Berlin'];

  it('returns the requested number of cities', () => {
    expect(pickRandomCities(2, pool)).toHaveLength(2);
  });

  it('never repeats a city', () => {
    const result = pickRandomCities(pool.length, pool);
    expect(new Set(result).size).toBe(pool.length);
  });

  it('only returns cities from the pool', () => {
    const result = pickRandomCities(3, pool);
    result.forEach((city) => expect(pool).toContain(city));
  });

  it('does not mutate the pool', () => {
    const original = [...pool];
    pickRandomCities(3, pool);
    expect(pool).toEqual(original);
  });

  it('caps the result when count exceeds the pool size', () => {
    const result = pickRandomCities(10, pool);
    expect(result).toHaveLength(pool.length);
    expect(new Set(result).size).toBe(pool.length);
  });
});
