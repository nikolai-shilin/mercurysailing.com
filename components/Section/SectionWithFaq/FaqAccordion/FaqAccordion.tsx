'use client';

import { Fragment, useState } from 'react';
import s from './s.module.css';
import type { FaqItemType } from 'types/data/FaqType';
import type { Locale } from 'lib/i18n';
import { getBorderColor, getHeaderColor, getTextColor, type Theme } from 'types/theme';




export type FaqAccordionProps = {
  items: FaqItemType[];
  locale?: Locale;
  theme?: Theme;
};




function ChevronIcon({ open, color }: { open: boolean, color: string }) {
  return (
    <svg
      className={`${s.chevron} ${open ? s.chevronOpen : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke={ color }
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}




export function FaqAccordion({ items, locale = 'en', theme = 'light' }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const textColor = getTextColor(theme);
  const headerColor = getHeaderColor(theme);
  const borderColor = getBorderColor(theme);

  if (!items?.length) {
    return null;
  }

  return (
    <div>
      <table className={ s.table } style={ { borderTop: `4px solid ${ borderColor }`, borderBottom: `4px solid ${ borderColor }` } }>
        <tbody>
          { items.map((item, index) => {
            const question = item.question?.[locale] ?? item.question?.en ?? '';
            const answer = item.answer?.[locale] ?? item.answer?.en ?? '';
            const isOpen = openIndex === index;
            const category = item.category?.[locale] ?? item.category?.en ?? '';

            return (
              <Fragment key={ index }>
                <tr>
                  <td className={ s.questionTd } colSpan={ 2 } style={ { borderBottom: `1px solid ${ borderColor }` } }>
                    <button
                      type="button"
                      className={s.rowTrigger}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      id={`faq-question-${index}`}
                    >
                      <span className={ s.questionText }>
                        {/* <span style={ { color: textColor } }>{ index + 1 } </span> */ }
                        {/* { '. ' } */ }
                        <span style={ { color: headerColor } }> { question }</span>
                      </span>
                      <ChevronIcon open={ isOpen } color={ textColor } />
                    </button>
                  </td>
                </tr>
                {isOpen && (
                  <tr>
                    <td
                      colSpan={ 2 }
                      className={ `${ s.answerTd } ${ isOpen ? s.answerTdOpen : '' }` }
                      id={ `faq-answer-${ index }` }
                      role="region"
                      aria-labelledby={ `faq-question-${ index }` }
                      style={ { borderBottom: `1px solid ${ borderColor }` } }
                    >
                      <div className={ s.answerText } style={ { color: textColor } }>{ answer }</div>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
