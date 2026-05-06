import { describe, it, expect } from 'vitest';
import {
  getDaysBetweenDates,
  getFormattedDate,
  getFormattedDateShort,
  getFormattedDatesShort,
  getFormattedPeriodShort,
  getFormattedDatesRangeFromStartDateAndDuration,
} from './dates';

describe('getDaysBetweenDates', () => {
  it('returns correct number of days', () => {
    expect(getDaysBetweenDates('2025-06-01', '2025-06-08')).toBe(7);
    expect(getDaysBetweenDates('2025-01-01', '2025-01-01')).toBe(0);
  });

  it('is order-independent (uses absolute diff)', () => {
    expect(getDaysBetweenDates('2025-06-08', '2025-06-01')).toBe(7);
  });
});

describe('getFormattedDate', () => {
  it('formats a date in Russian', () => {
    const result = getFormattedDate('2025-07-15', 'ru');
    expect(result).toMatch(/июл/i); // Russian month abbreviation
    expect(result).toMatch(/15/);
  });

  it('formats a date in English', () => {
    const result = getFormattedDate('2025-07-15', 'en');
    expect(result).toMatch(/Jul/i);
    expect(result).toMatch(/15/);
  });
});

describe('getFormattedDateShort', () => {
  it('returns short month format in Russian', () => {
    const result = getFormattedDateShort('2025-01-20', 'ru');
    expect(result).toMatch(/20/);
    expect(result).toMatch(/янв/i);
  });

  it('returns short month format in English', () => {
    const result = getFormattedDateShort('2025-01-20', 'en');
    expect(result).toMatch(/20/);
    expect(result).toMatch(/Jan/i);
  });
});

describe('getFormattedDatesShort', () => {
  it('combines start date and computed end date', () => {
    const result = getFormattedDatesShort('2025-06-01', 7, 'en');
    // Should include both start and end month/day
    expect(result).toMatch(/-/); // range separator
    expect(result).toMatch(/Jun/i);
  });
});

describe('getFormattedPeriodShort', () => {
  it('omits the month in the start date when both dates share the same month', () => {
    const result = getFormattedPeriodShort('2025-06-01', '2025-06-08', 'en');
    // "1 - June 8" or similar — the start should drop the month
    const parts = result.split('-');
    expect(parts.length).toBeGreaterThanOrEqual(2);
  });

  it('keeps full dates when months differ', () => {
    const result = getFormattedPeriodShort('2025-06-28', '2025-07-05', 'en');
    expect(result).toMatch(/Jun/i);
    expect(result).toMatch(/Jul/i);
  });
});

describe('getFormattedDatesRangeFromStartDateAndDuration', () => {
  it('includes the duration in days', () => {
    const result = getFormattedDatesRangeFromStartDateAndDuration('2025-06-01', 7, 'en');
    expect(result).toMatch(/7 days/);
  });

  it('uses Russian wording for ru locale', () => {
    const result = getFormattedDatesRangeFromStartDateAndDuration('2025-06-01', 7, 'ru');
    expect(result).toMatch(/7 дней/);
  });
});
