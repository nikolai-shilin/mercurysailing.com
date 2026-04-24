import type { Locale } from 'lib/i18n';

export type DictType = {
  included: string;
  excluded: string;
  earlyBird: string;
  earlyBirdDescription: string;
  totalSingleGuest: string;
  totalSingleGuestDescription: string;
  totalFullCabin: string;
  totalFullCabinDescription: string;
  caption: string;
  itemColHeader: string;
  priceColHeader: string;
}

export default function getDict(locale: Locale): DictType {
  return {
    included: locale === 'en' ? 'Included:' : 'В стоимость включено:',
    excluded: locale === 'en' ? 'Excluded:' : 'В стоимость не включено:',
    earlyBird: locale === 'en' ? 'Early Bird Price' : 'Early Bird Цена',
    earlyBirdDescription: locale === 'en' ? 'For one person with accommodation in a cabin for two, 3 months before the start of the cruise.' : 'Для одного человека с размещением в каюте на двоих, за 3 месяца до начала круиза.',
    totalSingleGuest: locale === 'en' ? 'Total for one person' : 'Итоговая стоимость(на одного человека)',
    totalSingleGuestDescription: locale === 'en' ? 'For one person with accommodation in a double cabin' : 'Для одного человека с размещением в каюте на двоих',
    totalFullCabin: locale === 'en' ? 'Total for a cabin(2 persons)' : 'Итоговая стоимость(за одну каюту)',
    totalFullCabinDescription: locale === 'en' ? 'For one cabin with accommodation in a double cabin' : 'Каюта на двоих',

    caption:        locale === 'en' ? 'Cruise pricing and inclusions' : 'Стоимость круиза и что входит в цену',
    itemColHeader:  locale === 'en' ? 'Item'                          : 'Позиция',
    priceColHeader: locale === 'en' ? 'Price'                         : 'Цена',
  };
}