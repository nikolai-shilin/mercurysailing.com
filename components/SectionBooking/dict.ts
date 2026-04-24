import type { Locale } from 'lib/i18n';

export type DictType = {
  guests: string;
  person: string;
  total: string;
  reservationType: string;
  departureDate: string;
  soldOut: string;
  seats: string;
  name: string;
  namePlaceholder: string;
  email: string;
  phone: string;
  cabinSingleGuest: string;
  cabinFullCabin: string;
  cabinEarlyBird: string;
  comments: string;
  commentsPlaceholder: string;
};

export default function getDict(locale: Locale): DictType {
  const isEn = locale === 'en';
  return {
    guests:           isEn ? 'Guests'                      : 'Гостей',
    person:           isEn ? 'guest(s)'                    : 'человек(ов)',
    total:            isEn ? 'Total cost'                  : 'Общая стоимость',
    reservationType:  isEn ? 'Reservation type'             : 'Тип бронирования',
    departureDate:    isEn ? 'Departure date'              : 'Дата отплытия',
    soldOut:          isEn ? 'Sold out'                    : 'Мест нет',
    seats:            isEn ? 'seats'                       : 'мест',
    name:             isEn ? 'Full name'                   : 'Имя, фамилия',
    namePlaceholder:  isEn ? 'Name'                        : 'Имя',
    email:            'Email',
    phone:            isEn ? 'Phone'                       : 'Телефон',
    cabinSingleGuest: isEn ? 'Single guest (in a double cabin)'    : 'Один гость (размещение в каюте на двоих)',
    cabinFullCabin:   isEn ? 'Full cabin (2 guests)'       : 'Полная каюта (2 гостя)',
    cabinEarlyBird:      isEn ? 'Single guest (Early bird)'                        : 'Один гость (Ранняя бронь)',
    comments:            isEn ? 'Comments'                                          : 'Комментарий',
    commentsPlaceholder: isEn ? 'Questions, wishes, dietary restrictions, etc.'    : 'Вопросы, пожелания, диетические ограничения и т.д.',
  };
}
