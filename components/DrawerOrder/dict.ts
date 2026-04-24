import type { Locale } from 'lib/i18n';

export type DictType = {
  datesOnRequest: (duration: number) => string;
};

export default function getDict(locale: Locale): DictType {
  const isEn = locale === 'en';
  return {
    datesOnRequest: (duration: number) =>
      isEn
        ? `Dates by request (${duration} days)`
        : `Даты по запросу (${duration} дней)`,
  };
}
