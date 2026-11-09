import { describe, expect, it, jest } from '@jest/globals';
import i18next from 'i18next';
import getDateNumber from './getDateNumber';

jest.mock('i18next', () => ({
  __esModule: true,
  default: {
    language: 'es',
  },
}));

const timestamp = new Date(2026, 0, 15, 12).getTime() / 1000;

describe('getDateNumber', () => {
  it('uses day/month order for Spanish', () => {
    i18next.language = 'es';

    expect(getDateNumber(timestamp)).toBe('15/1');
  });

  it('uses month/day order for English', () => {
    i18next.language = 'en';

    expect(getDateNumber(timestamp)).toBe('01/15');
  });
});
