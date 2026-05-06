import type { Locale } from 'lib/i18n';

export const getFormattedPeriod = (from: string, to: string) => {
  let fromDateString = getFormattedDate(from, 'ru');
  let toDateString = getFormattedDate(to, 'ru');
  if ( toDateString.includes(fromDateString.split(' ')[1])) {
  fromDateString = fromDateString.split(' ')[0];
  }
  const days = getDaysBetweenDates(from, to);
  return fromDateString + '-' + toDateString + ' (' + days + ' дней)';
}

export const getFormattedPeriodShort = (from: string, to: string, locale: Locale) => {
  let fromDateString = getFormattedDate(from, locale);
  let toDateString = getFormattedDate(to, locale);
  if (toDateString.includes(fromDateString.split(' ')[1])) {
    fromDateString = fromDateString.split(' ')[0];
  }
  return fromDateString + '-' + toDateString;
}


export const getDaysBetweenDates = (from: string, to: string) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}


export const getFormattedDate = (date: string, locale: Locale) => {
  return new Date(date).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
    month: 'long',
    day: 'numeric',
  });
}

export const getFormattedDateShort = (date: string, locale:Locale) => {
  return new Date(date).toLocaleDateString(locale === 'ru' ? 'ru-RU' : 'en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export const getFormattedDatesShort = (from: string, duration: number, locale: Locale) => {
  const fromDate = new Date(from);
  const toDate = new Date(fromDate.getTime() + duration * 24 * 60 * 60 * 1000);
  return getFormattedDateShort(fromDate.toISOString(), locale) + ' - ' + getFormattedDateShort(toDate.toISOString(), locale);
}


// const getEndDateFromStartDateAndDuration = (from: string, duration: number) => {
//   const fromDate = new Date(from);
//   const toDate = new Date(fromDate.getTime() + duration * 24 * 60 * 60 * 1000);
//   return Intl.DateTimeFormat('ru-RU', { month: 'long', day: 'numeric' }).format(toDate);
// }

export const getFormattedDatesRangeFromStartDateAndDuration = (from: string, duration: number, locale: Locale) => {
  const fromDate = new Date(from);
  const toDate = new Date(fromDate.getTime() + duration * 24 * 60 * 60 * 1000).toISOString();
  return `${ getFormattedPeriodShort(from, toDate, locale) } (${ locale === 'ru' ? `${ duration } дней` : `${ duration } days` })`;
}