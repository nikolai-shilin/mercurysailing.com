import type { Locale } from 'lib/i18n';

export type DictType = {
  copyright: string;
  howToContactUs: string;
  usedPhotos: string;
  madeIn: string;
  privacyPolicy: string;
};

export default function getDict(locale: Locale): DictType {
  return {
    copyright: locale === 'en' ? '© 2026 Wild Workation. All rights reserved.' : '© 2026 Wild Workation. Все права защищены.',
    howToContactUs: locale === 'en' ? 'How to contact us' : 'Как с нами связаться',
    usedPhotos: locale === 'en' ? 'Used photos' : 'Использованы фотографии',
    madeIn: locale === 'en' ? 'Made in' : 'Сделано в',
    privacyPolicy: locale === 'en' ? 'Privacy policy' : 'Политика конфиденциальности',
  };
}