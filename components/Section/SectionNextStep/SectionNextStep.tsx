import { Button } from 'components/common/Button/Button';
import { LocaleLink } from 'components/common/LocaleLink';
import type { Locale } from 'lib/i18n';
import { Section } from 'components/Section/Section/Section';
import { SectionContainer } from 'components/Section/SectionContainer/SectionContainer';
import type { Theme } from 'types/theme';
import s from './s.module.css';

export type SectionNextStepLink = {
  label: string;
  to: string;
};

export type SectionNextStepProps = {
  locale: Locale;
  title: string;
  body: string;
  primary: SectionNextStepLink;
  /** Optional lower-commitment second action (e.g. Telegram). Rendered as an inline underlined link. */
  secondary?: SectionNextStepLink;
  theme?: Theme;
};

/**
 * Closing "next step" block for pages that are educational/SEO landing points
 * (e.g. /how-it-works, /what-is-a-workation). Ends the page with a clear
 * primary action + a lower-commitment secondary link, so organic traffic
 * doesn't dead-end after reading.
 */
export function SectionNextStep({
  locale,
  title,
  body,
  primary,
  secondary,
  theme = 'dark',
}: SectionNextStepProps) {
  const isDarkish = theme === 'dark' || theme === 'black';
  const themeClass = isDarkish ? s.themeDark : s.themeLight;

  return (
    <Section theme={ theme } aria-label={ title }>
      <SectionContainer>
        <div className={ `${ s.wrap } ${ themeClass }` }>
          <h2 className={ s.title }>{ title }</h2>
          <p className={ s.body }>{ body }</p>
          <div className={ s.ctaRow }>
            <Button
              label={ primary.label }
              to={ primary.to }
              color={ isDarkish ? 'white' : 'blue' }
              withBorder={ true }
              withArrow={ true }
            />
            { secondary && (
              secondary.to.startsWith('http') || secondary.to.startsWith('tel:') || secondary.to.startsWith('mailto:')
                ? (
                  <a
                    className={ s.secondary }
                    href={ secondary.to }
                    target={ secondary.to.startsWith('http') ? '_blank' : undefined }
                    rel={ secondary.to.startsWith('http') ? 'noopener noreferrer' : undefined }
                  >
                    { secondary.label }
                  </a>
                )
                : (
                  <LocaleLink href={ secondary.to } className={ s.secondary }>
                    { secondary.label }
                  </LocaleLink>
                )
            ) }
          </div>
        </div>
      </SectionContainer>
    </Section>
  );
}
