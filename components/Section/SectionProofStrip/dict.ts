import type { Locale } from 'lib/i18n';

export type ProofItem = {
  /** Short, scannable label — e.g. "18 years at sea", "Starlink on board". */
  label: string;
};

export type DictType = {
  /** aria-label for the region */
  regionLabel: string;
  /** Items rendered as a row of bullets on one line */
  items: ProofItem[];
};

export default function getDict(locale: Locale): DictType {
  const isEn = locale === 'en';
  return {
    regionLabel: isEn ? 'Why trust us' : 'Почему нам можно доверять',
    items: isEn
      ? [
        { label: 'Run by RYC Sailing' },
        { label: '18 years at sea' },
        { label: 'IYT-certified captains' },
        { label: 'Starlink on board' },
      ]
      : [
        { label: 'Оператор — RYC Sailing' },
        { label: '18 лет на воде' },
        { label: 'Капитаны IYT' },
        { label: 'Starlink на борту' },
      ],
  };
}
