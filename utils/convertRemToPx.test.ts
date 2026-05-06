import { describe, it, expect } from 'vitest';
import { convertRemToPx } from './convertRemToPx';

describe('convertRemToPx', () => {
  it('converts whole-number rem values', () => {
    expect(convertRemToPx('1rem')).toBe(16);
    expect(convertRemToPx('2rem')).toBe(32);
    expect(convertRemToPx('0rem')).toBe(0);
  });

  it('converts fractional rem values (truncates via parseInt)', () => {
    expect(convertRemToPx('1.5rem')).toBe(16); // parseInt('1.5') === 1
  });

  it('handles larger values', () => {
    expect(convertRemToPx('10rem')).toBe(160);
  });
});
