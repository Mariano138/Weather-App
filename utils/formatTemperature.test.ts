import { describe, expect, it } from '@jest/globals';
import formatTemperature from './formatTemperature';

describe('formatTemperature', () => {
  it('rounds decimal values to the nearest integer', () => {
    expect(formatTemperature(23.4)).toBe(23);
    expect(formatTemperature(23.6)).toBe(24);
  });

  it('handles negative temperatures', () => {
    expect(formatTemperature(-2.4)).toBe(-2);
    expect(formatTemperature(-2.6)).toBe(-3);
  });

  it('returns zero unchanged', () => {
    expect(formatTemperature(0)).toBe(0);
  });
});
