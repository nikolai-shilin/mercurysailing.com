import type { Locale } from 'lib/i18n';

export type DictType = {
  text: string;
};

export default function getDict(locale: Locale): DictType {
  return {
    text: locale === 'en' ? 'Wild Workation' : 'Дикий Коворкинг',
  };
}