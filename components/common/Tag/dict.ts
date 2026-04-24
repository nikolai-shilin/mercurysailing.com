import type { Locale } from 'lib/i18n';

export type DictType = {
  days: string;
  from: string;
  fromLabel: string;
};

const DICT: Record<Locale, DictType> = {
  en: { days: 'days', from: 'from', fromLabel: 'from' },
  ru: { days: 'дней', from: 'от',   fromLabel: 'от' },
};

export default function getDict(locale: Locale): DictType {
  return DICT[locale] ?? DICT.en;
}
