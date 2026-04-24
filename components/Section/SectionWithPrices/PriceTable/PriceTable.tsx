import { For } from 'components/common/For/For';
import s from './s.module.css';
import type { ExcludedPriceItemType, IncludedPriceItemType, TotalPriceType } from 'types/data/PriceType';
import { ShowIf } from 'components/common/ShowIf/ShowIf';
import type { Locale } from 'lib/i18n';
import getDict from './dict';




export type PriceTableItem = {
  title: string;
  description: string;
  price?: number;
}

export type PriceTableProps = {
  included: IncludedPriceItemType[];
  excluded: ExcludedPriceItemType[];
  total?: TotalPriceType;
  discount?: number;
  currency?: string;
  locale?: Locale;
}




/** Format a price as a locale-aware currency string (e.g. "€1,100").
 *  Produces natural-language output that AI answer engines and shoppers
 *  read instantly — instead of "1100.00 EUR". Falls back gracefully if
 *  the currency code is unknown. */
const formatPrice = (
  value: number | undefined,
  currency: string | undefined,
  locale: Locale,
  emptySymbol: string,
): string => {
  if (value == null || !Number.isFinite(value)) return emptySymbol;
  try {
    return new Intl.NumberFormat(locale === 'ru' ? 'ru-RU' : 'en-US', {
      style: 'currency',
      currency: currency || 'EUR',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${value.toFixed(0)} ${currency ?? ''}`.trim();
  }
};

/** Machine-readable ISO-like price for <data value="..."> — lets structured-data
 *  scrapers and crawlers pick the raw number without parsing the formatted string. */
const rawPriceValue = (value: number | undefined): string => {
  if (value == null || !Number.isFinite(value)) return '';
  return value.toFixed(2);
};


export const PriceTable = ({ included, excluded, total, discount = 0, currency, locale = 'en' }: PriceTableProps) => {

  const d = getDict(locale);
  const cur = currency || 'EUR';

  return <div>
    <table className={ s.table }>
      {/* Caption summarises the table's subject for assistive tech, AI parsers,
          and structured-data crawlers. Visually hidden — the visible section
          title is rendered outside the table by the parent section. */}
      <caption className={ s.srOnly }>{ d.caption }</caption>
      <thead>
        {/* Column headers are visually hidden but kept in the DOM so row
            cells can reference them via scope. This preserves the existing
            visual design while giving the table a proper semantic shape. */}
        <tr className={ s.srOnly }>
          <th scope="col">{ d.itemColHeader }</th>
          <th scope="col">{ d.priceColHeader }</th>
        </tr>
        <tr>
          <th scope="colgroup" colSpan={ 2 } className={ s.sectionTitleTd }>{ d.included }</th>
        </tr>
      </thead>
      <tbody>
        <ShowIf condition={ included && included.length > 0 }>

        <For list={ included } itemFn={ (item, index) => (
          <tr key={ index }>
            <th scope="row" className={ s.descriptionTd }>
                <h3 className={ s.title }>{ item?.title?.[locale] }</h3>
                <p className={ s.description }>{ item?.description?.[locale] }</p>
            </th>
            <td className={ s.priceTd }>
                { item?.price && Number.isFinite(item.price)
                  ? <data value={ rawPriceValue(item.price) }>{ formatPrice(item.price, cur, locale, '+') }</data>
                  : '+' }
            </td>
          </tr>
          ) } />
        </ShowIf>
        <ShowIf condition={ excluded && excluded.length > 0 }>
        <tr>
          <th scope="colgroup" colSpan={ 2 } className={ s.sectionTitleTd }>{ d.excluded }</th>
        </tr>
        <For list={ excluded } itemFn={ (item, index) => (
          <tr key={ index }>
            <th scope="row" className={ s.descriptionTd }>
                <h3 className={ s.title }>{ item?.title?.[locale] }</h3>
                <p className={ s.description }>{ item?.description?.[locale] }</p>
            </th>
            <td className={ s.priceTd }>
              { item?.price && Number.isFinite(item.price)
                ? <data value={ rawPriceValue(item.price) }>{ formatPrice(item.price, cur, locale, '-') }</data>
                : '-' }
            </td>
          </tr>
          ) } />
        </ShowIf>
      </tbody>
      {/* Totals live in <tfoot> so they're semantically distinguished from line items —
          standard table semantics for AI parsers and screen readers. */}
      <tfoot>
        <tr>
          <th scope="row" className={ s.sectionTitleTd }>
            <h3 className={ s.title }>{ d.earlyBird }</h3>
            <p className={ s.description }>{ d.earlyBirdDescription }</p>
          </th>
          <td className={ s.sectionTitleTd } style={ { textAlign: 'center' } }>
            <ShowIf condition={ discount > 0 }>
              <s style={ { color: 'var(--color-text)' } }>
                { total?.single_guest != null
                  ? formatPrice(total.single_guest, cur, locale, '-.--')
                  : '-.--' }
              </s><br />
              <data value={ rawPriceValue((total?.early_bird ?? 0) - discount) }>
                { formatPrice((total?.early_bird ?? 0) - discount, cur, locale, '-') }
              </data>
            </ShowIf>
            <ShowIf condition={ discount <= 0 }>
              <data value={ rawPriceValue(total?.early_bird) }>
                { formatPrice(total?.early_bird, cur, locale, '-') }
              </data>
            </ShowIf>
          </td>
        </tr>
        <tr>
          <th scope="row" className={ s.sectionTitleTd }>
            <h3 className={ s.title }>{ d.totalSingleGuest }</h3>
            <p className={ s.description }>{ d.totalSingleGuestDescription }</p>
          </th>
          <td className={ s.sectionTitleTd } style={ { textAlign: 'center' } }>
            <ShowIf condition={ discount > 0 }>
              <s style={ { color: 'var(--color-text)' } }>
                { total?.single_guest != null
                  ? formatPrice(total.single_guest, cur, locale, '-.--')
                  : '-.--' }
              </s><br />
              <data value={ rawPriceValue((total?.single_guest ?? 0) - discount) }>
                { formatPrice((total?.single_guest ?? 0) - discount, cur, locale, '-') }
              </data>
            </ShowIf>
            <ShowIf condition={ discount <= 0 }>
              <data value={ rawPriceValue(total?.single_guest) }>
                { formatPrice(total?.single_guest, cur, locale, '-') }
              </data>
            </ShowIf>
          </td>
        </tr>
        <tr>
          <th scope="row" className={ s.sectionTitleTd }>
            <h3 className={ s.title }>{ d.totalFullCabin }</h3>
            <p className={ s.description }>{ d.totalFullCabinDescription }</p>
          </th>
          <td className={ s.sectionTitleTd } style={ { textAlign: 'center' } }>
            <ShowIf condition={ discount > 0 }>
              <s style={ { color: 'var(--color-text)' } }>
                { total?.single_guest != null
                  ? formatPrice(total.single_guest, cur, locale, '-.--')
                  : '-.--' }
              </s><br />
              <data value={ rawPriceValue((total?.full_cabin ?? 0) - discount) }>
                { formatPrice((total?.full_cabin ?? 0) - discount, cur, locale, '-') }
              </data>
            </ShowIf>
            <ShowIf condition={ discount <= 0 }>
              <data value={ rawPriceValue(total?.full_cabin) }>
                { formatPrice(total?.full_cabin, cur, locale, '-') }
              </data>
            </ShowIf>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
}
