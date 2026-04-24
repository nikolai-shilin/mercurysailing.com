'use client';

import { Button, type ButtonProps } from 'components/common/Button/Button';
import s from './s.module.css';
import { getFormattedDatesRangeFromStartDateAndDuration } from 'utils/dates';
import { ShowIf } from '../common/ShowIf/ShowIf';
import type { Locale } from 'lib/i18n';
import getDict from './dict';




export type DrawerOrderProps = {
  total: number;
  discount: number | null;
  currency: string;
  from: string | null;
  duration: number;
  locale: Locale;
  action: ButtonProps;
}




export const DrawerOrder = ({ total, discount, currency, from, duration, locale, action }: DrawerOrderProps) => {
  const d = getDict(locale);
  let datesString = '';
  if (!from) {
    datesString = d.datesOnRequest(duration);
  } else {
    datesString = getFormattedDatesRangeFromStartDateAndDuration(from, duration, locale);
  }

  return (
    <div className={ s.container }>
      <div style={ {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      } }>
        <div className={ s.left }>
          <div>
            <strong className={ s.total }>{ total - (discount || 0) } { currency }</strong>
            <ShowIf condition={ !!discount && discount > 0 }>
              <span className={ s.discount }>
                { ' ' }
                { total } { currency }
              </span>
            </ShowIf>
          </div>
          <div className={ s.dates }>
            { datesString }
          </div>
        </div>
        <div>
          <Button
            label={ action.label }
            size='md'
            to={ action.to }
            color={ action.color }
            withBorder={ action.withBorder }
            withBlur={ action.withBlur }
            withShadow={ action.withShadow }
          />
        </div>
      </div>
    </div>
  );
};

