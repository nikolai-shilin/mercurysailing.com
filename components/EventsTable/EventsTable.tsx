import type { EventType } from 'types/data/EventType';
import type { Locale } from 'lib/i18n';
import { getFormattedDatesShort } from 'utils/dates';
import getDict from './dict';
import s from './s.module.css';
import { type Theme } from 'types/theme';




export type EventsTableProps = {
  events: EventType[];
  locale: Locale;
  theme: Theme;
};




export function EventsTable({ events, locale, theme = 'white' }: EventsTableProps) {
  if (!events.length) return null;

  const d = getDict(locale);

  return (
    <div className={ s.wrapper }>
      <table className={ s.table }>
        <tbody>
          { events.map((event) => {
            const dates = getFormattedDatesShort(event.from.toString(), event.duration, locale);
            const duration = event.duration + ' ' + (locale === 'ru' ? 'дней' : 'days');
            const available = event.seats?.available ?? 0;
            const total = event.seats?.total ?? 0;
            const hasSeat = available > 0;

            return (
              <tr key={ event.id } className={ s.row }>
                <td className={ `${ s.td } ${ s.colDates }` }><strong>{ dates } ({ duration })</strong></td>
                <td className={ `${ s.td } ${ s.colSeats }` }>
                  { hasSeat ? (
                    <span className={ s.seatsAvailable }>
                      <span className={ s.seatsAvailableCount }>{ available }</span>
                      { '/' }{ total }
                      { ' ' }{ d.seats }
                    </span>
                  ) : (
                    <span className={ s.seatsSoldOut }><strong>{ d.soldOut }</strong></span>
                  ) }
                </td>
                <td className={ `${ s.td } ${ s.colPrice }` }>
                  { (() => {
                    const total = event.cruise?.price?.total;
                    if (!total) return '—';
                    const lowest = Math.min(
                      ...Object.values(total).filter((v): v is number => typeof v === 'number' && v > 0)
                    );
                    if (!isFinite(lowest)) return '—';
                    return (
                      <>
                        { d.from }
                        { ' ' }
                        { `${ lowest }${ event.cruise?.price?.currency }` }
                      </>);
                  })() }
                </td>
              </tr>
            );
          }) }
        </tbody>
      </table>
    </div>
  );
}
