import { describe, it, expect } from 'vitest';
import { getParagraphedText } from './getParagraphedText';

describe('getParagraphedText', () => {
  it('wraps each line in a <p> tag', () => {
    expect(getParagraphedText('Hello')).toBe('<p>Hello</p>');
    expect(getParagraphedText('Line 1\nLine 2')).toBe('<p>Line 1</p><p>Line 2</p>');
  });

  it('returns empty string for empty input', () => {
    expect(getParagraphedText('')).toBe('');
    expect(getParagraphedText('   ')).toBe('');
  });

  it('returns empty string for undefined', () => {
    expect(getParagraphedText(undefined)).toBe('');
  });

  it('handles multiple newlines', () => {
    const result = getParagraphedText('A\nB\nC');
    expect(result).toBe('<p>A</p><p>B</p><p>C</p>');
  });
});
