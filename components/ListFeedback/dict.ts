import type { Locale } from 'lib/i18n';

export type DictType = {
  showMore: string;
  showLess: string;
};

const dict: Record<Locale, DictType> = {
  en: {
    showMore: 'More reviews',
    showLess: 'Fewer reviews',
  },
  ru: {
    showMore: 'Больше отзывов',
    showLess: 'Меньше отзывов',
  },
};

export default function getDict(locale: Locale): DictType {
  return dict[locale] ?? dict.en;
}
