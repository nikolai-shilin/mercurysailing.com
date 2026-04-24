import type { Locale } from 'lib/i18n';
import s from './s.module.css';
import getDict from './dict';




export type TagProps = {
  duration: number;
  price: number;
  currency?: string;
  locale: Locale;
  from?: boolean;
}




export const Tag = ({ duration, price, currency = 'RUB', locale, from = false }: TagProps) => {
  const d = getDict(locale);
  const currencySign = currency === 'EUR' ? '€' : currency === 'USD' ? '$' : '₽';
  const durationString = `${ duration } ${ d.days }`;
  const priceString = from
    ? `${ currencySign }${ price }`
    : `${ d.from } ${ currencySign }${ price }`;

  return (
    <div className={ s.tag }>
      <div className={ s.yellow }>{ durationString }</div>
      <div className={ s.red } style={ {
        paddingTop: !from ? '1.25rem' : '1rem',
        paddingBottom: !from ? '1.25rem' : '1rem',
      } }>
        { from && <div className={ s.fromLabel }>{ d.fromLabel }</div> }
        <div className={ s.price }>{ priceString }</div>
      </div>
    </div>
  );
}
