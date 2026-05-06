import { describe, it, expect } from 'vitest';
import {
  locales,
  defaultLocale,
  isLocale,
  getPathWithLocale,
  getLocaleFromPathname,
  getLocalizedPath,
} from './i18n';

describe('locales', () => {
  it('contains en and ru', () => {
    expect(locales).toContain('en');
    expect(locales).toContain('ru');
  });

  it('default locale is en', () => {
    expect(defaultLocale).toBe('en');
  });
});

describe('isLocale', () => {
  it('returns true for valid locales', () => {
    expect(isLocale('en')).toBe(true);
    expect(isLocale('ru')).toBe(true);
  });

  it('returns false for invalid values', () => {
    expect(isLocale('fr')).toBe(false);
    expect(isLocale('')).toBe(false);
    expect(isLocale('EN')).toBe(false);
  });
});

describe('getPathWithLocale', () => {
  it('prefixes a path with the locale', () => {
    expect(getPathWithLocale('/events', 'en')).toBe('/en/events');
    expect(getPathWithLocale('/cruises', 'ru')).toBe('/ru/cruises');
  });

  it('handles root path', () => {
    expect(getPathWithLocale('/', 'en')).toBe('/en');
    expect(getPathWithLocale('/', 'ru')).toBe('/ru');
  });

  it('adds a leading slash when missing', () => {
    expect(getPathWithLocale('events', 'en')).toBe('/en/events');
  });
});

describe('getLocaleFromPathname', () => {
  it('extracts locale from a localised path', () => {
    expect(getLocaleFromPathname('/en/events')).toBe('en');
    expect(getLocaleFromPathname('/ru/cruises')).toBe('ru');
  });

  it('falls back to defaultLocale when no locale prefix', () => {
    expect(getLocaleFromPathname('/events')).toBe(defaultLocale);
    expect(getLocaleFromPathname('/')).toBe(defaultLocale);
  });

  it('falls back to defaultLocale for unknown prefixes', () => {
    expect(getLocaleFromPathname('/fr/page')).toBe(defaultLocale);
  });
});

describe('getLocalizedPath', () => {
  it('replaces locale segment in pathname', () => {
    expect(getLocalizedPath('/en/events', 'ru')).toBe('/ru/events');
    expect(getLocalizedPath('/ru/cruises', 'en')).toBe('/en/cruises');
  });

  it('handles root-only pathname', () => {
    expect(getLocalizedPath('/', 'ru')).toBe('/ru');
    expect(getLocalizedPath('', 'en')).toBe('/en');
  });

  it('prepends locale when no locale prefix present', () => {
    expect(getLocalizedPath('/events', 'ru')).toBe('/ru/events');
  });
});
