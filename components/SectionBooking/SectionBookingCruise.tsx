'use client';

import { useState } from 'react';
import s from './s.module.css';
import type { CruiseType, EventType } from 'types/data/EventType';
import type { Locale } from 'lib/i18n';
import getDict from './dict';
import { ymGoal } from 'lib/ym';
import { getFormattedDatesRangeFromStartDateAndDuration } from 'utils/dates';




export type SectionBookingCruiseProps = {
  cruise: CruiseType;
  events?: EventType[];
  action: (formData: FormData) => Promise<void>;
  formId?: string;
  locale?: Locale;
};




export default function SectionBookingCruise({
  cruise,
  events = [],
  action,
  formId,
  locale = 'en',
}: SectionBookingCruiseProps) {
  const price = cruise.price;
  const total = price?.total;
  const currency = price?.currency ?? 'EUR';

  const reservationTypes = [
    { key: 'single_guest', value: total?.single_guest },
    { key: 'full_cabin', value: total?.full_cabin },
    { key: 'early_bird', value: total?.early_bird },
  ].filter((c) => c.value != null && c.value > 0);

  const [reservationType, setReservationType] = useState(reservationTypes[0]?.key ?? 'single_guest');
  const [guests, setGuests] = useState(1);
  const [eventId, setEventId] = useState(events[0]?.id ?? '');

  const selectedEventDate = events.find((e) => e.id === eventId)?.from?.toString() ?? '';
  const pricePerGuest = reservationTypes.find((c) => c.key === reservationType)?.value ?? 0;
  const totalCost = pricePerGuest * guests;

  const t = getDict(locale);

  return (
    <form id={ formId } action={ action } onSubmit={ () => ymGoal('booking_submitted', { cruise: cruise.slug }) }>
      <div className={ s.form }>
        <input type="hidden" name="slug" value={ cruise.slug } />
        <input type="hidden" name="currency" value={ currency } />
        <input type="hidden" name="reservation_type" value={ reservationType } />
        <input type="hidden" name="guests" value={ guests } />
        <input type="hidden" name="total" value={ totalCost } />
        {/* <input type="hidden" name="lang" value={ locale } /> */ }
        {/* <input type="hidden" name="event_id" value={ eventId } /> */ }
        <input type="hidden" name="event_date" value={ selectedEventDate } />

        { events.length > 0 && (
          <label className={ s.inputLabel }>
            <div>{ t.departureDate }</div>
            <select
              name="event_id_display"
              value={ eventId }
              onChange={ (e) => setEventId(e.target.value) }
              className={ s.inputText }
            >
              { events.map((event) => {
                const dates = getFormattedDatesRangeFromStartDateAndDuration(
                  event.from.toString(),
                  event.duration,
                  locale,
                );
                const available = event.seats?.available ?? 0;
                const seatsLabel = available > 0
                  ? `· ${available} ${t.seats}`
                  : `· ${t.soldOut}`;
                return (
                  <option key={ event.id } value={ event.id }>
                    { dates } { seatsLabel }
                  </option>
                );
              }) }
            </select>
          </label>
        ) }

        { reservationTypes.length > 1 && (
          <label className={ s.inputLabel }>
            <div>{ t.reservationType }</div>
            <select
              name="reservation_type_display"
              value={ reservationType }
              onChange={ (e) => setReservationType(e.target.value) }
              className={ s.inputText }
            >
              { reservationTypes.map((c) => (
                <option key={ c.key } value={ c.key }>
                  { c.key === 'single_guest' ? t.cabinSingleGuest : c.key === 'full_cabin' ? t.cabinFullCabin : t.cabinEarlyBird } — { c.value } { currency }
                </option>
              )) }
            </select>
          </label>
        ) }

        <label htmlFor="name" className={ s.inputLabel } style={ { flex: 1 } }>
          <div>{ t.name }</div>
          <input
            type="text"
            name="name"
            placeholder={ t.namePlaceholder }
            required
            className={ s.inputText }
          />
        </label>

        <label htmlFor="email" className={ s.inputLabel } style={ { flex: 1 } }>
          <div>{ t.email }</div>
          <input
            type="email"
            name="email"
            placeholder={ t.email }
            required
            className={ s.inputText }
          />
        </label>

        <label htmlFor="phone" className={ s.inputLabel }>
          <div>{ t.phone }</div>
          <input
            type="tel"
            name="phone"
            placeholder={ t.phone }
            required
            className={ s.inputText }
          />
        </label>

        <label htmlFor="comments" className={ s.inputLabel }>
          <div>{ t.comments }</div>
          <textarea
            name="comments"
            id="comments"
            placeholder={ t.commentsPlaceholder }
            className={ s.inputText }
          />
        </label>
      </div>
    </form>
  );
}
