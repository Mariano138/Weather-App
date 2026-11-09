import { describe, expect, it } from '@jest/globals';
import capitalize from './capitalize';

describe('capitalize', () => {
  it('capitalizes the first letter', () => {
    expect(capitalize('london')).toBe('London');
  });

  it('keeps an already capitalized word unchanged', () => {
    expect(capitalize('London')).toBe('London');
  });

  it('returns an empty string unchanged', () => {
    expect(capitalize('')).toBe('');
  });
});
