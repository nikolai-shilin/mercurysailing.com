import type { Locale } from 'lib/i18n';

export type DictType = {
  home: string;
};

export default function getDict(locale: Locale): DictType {
  const isEn = locale === 'en';
  return {
    home: isEn ? 'Home' : 'Домой',
  };
}
