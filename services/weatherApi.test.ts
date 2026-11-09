import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { fetchWeather } from './weatherApi';

describe('fetchWeather', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('throws when the city is empty', async () => {
    await expect(fetchWeather('   ', 'en')).rejects.toThrow('City is required');
  });

  it('returns the weather data on success', async () => {
    const data = { current: { name: 'Madrid' }, forecast: [] };
    jest.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => data,
    } as Response);

    await expect(fetchWeather('Madrid', 'en')).resolves.toEqual(data);
  });

  it('throws when the API returns an error', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
    } as Response);

    await expect(fetchWeather('Nowhere', 'es')).rejects.toThrow('City not found');
  });

  it('encodes the city and maps the language', async () => {
    const fetchSpy = jest.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({}),
    } as Response);

    await fetchWeather('Buenos Aires', 'en-US');

    expect(fetchSpy).toHaveBeenCalledWith(expect.stringContaining('city=Buenos%20Aires&lang=en'));
  });
});
