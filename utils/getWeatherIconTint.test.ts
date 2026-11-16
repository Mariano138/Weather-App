import { describe, expect, it } from '@jest/globals';
import getWeatherIconTint from './getWeatherIconTint';

describe('getWeatherIconTint', () => {
  it('tints the moon white', () => {
    expect(getWeatherIconTint('01n')).toBe('#ffffff');
  });

  it('tints the snowflake and mist glyphs in both variants', () => {
    expect(getWeatherIconTint('13n')).toBe('#ffffff');
    expect(getWeatherIconTint('13d')).toBe('#ffffff');
    expect(getWeatherIconTint('50n')).toBe('#ffffff');
    expect(getWeatherIconTint('50d')).toBe('#ffffff');
  });

  it('leaves the sun and the mixed icons untouched', () => {
    expect(getWeatherIconTint('01d')).toBeUndefined();
    expect(getWeatherIconTint('02d')).toBeUndefined();
    expect(getWeatherIconTint('02n')).toBeUndefined();
    expect(getWeatherIconTint('04n')).toBeUndefined();
    expect(getWeatherIconTint('10d')).toBeUndefined();
    expect(getWeatherIconTint('11n')).toBeUndefined();
  });
});
