import type { Locale } from 'lib/i18n';
import type { Theme } from 'types/theme';
import { type Scarcity, scarcityLabel } from 'utils/scarcity';
import s from './s.module.css';

export type ScarcityBadgeProps = {
  scarcity: Scarcity | null;
  locale: Locale;
  /** Surface theme where the badge will render. Determines text / background contrast. */
  theme?: Theme;
};

/**
 * Small capsule rendered next to a trip card's title communicating scarcity
 * ("3 berths left" / "Filling fast"). Hides itself when scarcity is null so
 * callers can drop it in unconditionally.
 */
export function ScarcityBadge({ scarcity, locale, theme = 'white' }: ScarcityBadgeProps) {
  if (!scarcity) return null;

  const isDarkish = theme === 'dark' || theme === 'black';
  const kindClass = scarcity.kind === 'filling-fast' ? s.urgent : s.moderate;
  const themeClass = isDarkish ? s.themeDark : '';

  return (
    <span
      className={ `${ s.badge } ${ kindClass } ${ themeClass }` }
      aria-label={ scarcityLabel(scarcity, locale) }
      role="status"
    >
      <span className={ s.dot } aria-hidden="true" />
      { scarcityLabel(scarcity, locale) }
    </span>
  );
}
