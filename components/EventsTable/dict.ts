import type { Locale } from 'lib/i18n';

export type DictType = {
  section: string;
  title: string;
  columnDates: string;
  columnSeats: string;
  columnBoat: string;
  soldOut: string;
  seats: string;
  from: string;
};

export default function getDict(locale: Locale): DictType {
  const isEn = locale === 'en';
  return {
    section:      isEn ? 'Schedule'       : 'Расписание',
    title:        isEn ? 'Available dates' : 'Доступные даты',
    columnDates:  isEn ? 'Dates'           : 'Даты',
    columnSeats:  isEn ? 'Seats'           : 'Мест',
    columnBoat:   isEn ? 'Yacht'           : 'Яхта',
    soldOut:      isEn ? 'Sold out'        : 'Мест нет',
    seats:        isEn ? 'seats'           : 'мест',
    from:         isEn ? 'from'            : 'от',
  };
}
