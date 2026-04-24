import { Fragment } from 'react';
import type { Locale } from 'lib/i18n';
import { getBackgroundColor, type Theme } from 'types/theme';
import getDict from './dict';
import s from './s.module.css';

export type SectionProofStripProps = {
  locale: Locale;
  /** Visual theme — matches the rest of the Section system. Defaults to 'dark' to sit below a dark hero. */
  theme?: Theme;
};

/**
 * Thin horizontal trust strip. Renders immediately under the hero to answer
 * "should I trust this?" before the visitor scrolls far enough to bounce.
 *
 * - Content is short, factual, localizable, and scannable.
 * - No CTAs, no icons that need loading — pure inline text + separator dots.
 * - Tiny footprint: ~48–64px tall on mobile, ~56–72px on desktop.
 */
export function SectionProofStrip({ locale, theme = 'dark' }: SectionProofStripProps) {
  const d = getDict(locale);
  const isDarkish = theme === 'dark' || theme === 'black';
  const themeClass = isDarkish ? s.themeDark : s.themeLight;

  return (
    <section
      aria-label={ d.regionLabel }
      className={ `${ s.strip } ${ themeClass }` }
      style={ { backgroundColor: getBackgroundColor(theme) } }
    >
      <div className={ s.inner }>
        { d.items.map((item, index) => (
          <Fragment key={ item.label }>
            { index > 0 && <span className={ s.dot } aria-hidden="true" /> }
            <span className={ s.item }>{ item.label }</span>
          </Fragment>
        )) }
      </div>
    </section>
  );
}
