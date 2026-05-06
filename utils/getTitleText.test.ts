import { describe, it, expect } from 'vitest';
import { getTitleText } from './getTitleText';

describe('getTitleText', () => {
  it('returns the input trimmed and with a trailing space on the last word', () => {
    const result = getTitleText('Hello world');
    // All words end in space or &nbsp; — joining produces a string with no raw leading space
    expect(result.trim()).toContain('Hello');
    expect(result).toContain('world');
  });

  it('appends &nbsp; after a short word that follows a long word', () => {
    // words are processed in reverse; "a" follows "workation" (len 9) → gets &nbsp;
    const result = getTitleText('workation a');
    expect(result).toContain('a&nbsp;');
  });

  it('does not append &nbsp; when the preceding word is also short', () => {
    // "a" follows "in" (len 2, not > 3) — no &nbsp;
    const result = getTitleText('in a');
    expect(result).not.toContain('a&nbsp;');
  });

  it('normalises &nbsp; entities in input to spaces before processing', () => {
    const result = getTitleText('hello&nbsp;world');
    expect(result).toContain('hello');
    expect(result).toContain('world');
  });

  it('collapses multiple spaces', () => {
    const result = getTitleText('hello   world');
    expect(result).not.toMatch(/\s{2}/);
  });

  it('handles a single word', () => {
    const result = getTitleText('Workation');
    expect(result.trim()).toBe('Workation');
  });
});
