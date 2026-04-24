import { Section } from '../Section/Section';
import { SectionTitle } from 'components/Section/SectionTitle/SectionTitle';
import { SectionPreface } from '../SectionPreface/SectionPreface';
import { SectionContainer } from '../SectionContainer/SectionContainer';
import { FaqAccordion } from './FaqAccordion/FaqAccordion';
import s from './s.module.css';
import type { Theme } from 'types/theme';
import type { FaqItemType } from 'types/data/FaqType';
import type { Locale } from 'lib/i18n';

export type SectionWithFaqProps = {
  title?: string;
  section?: string;
  theme: Theme;
  description?: string;
  items?: FaqItemType[];
  locale?: Locale;
};

export function SectionWithFaq({
  title = '',
  section = '',
  theme,
  description = '',
  items = [],
  locale = 'en',
}: SectionWithFaqProps) {
  return (
    <Section theme={theme}>
      <SectionContainer>
        <div className={s.grid}>
          <div className={s.left}>
            <div className={s.header}>
              <SectionTitle title={title} section={section} theme={theme} level="h2" />
              <SectionPreface text={description} theme={theme} style={{ maxWidth: '100%' }} />
            </div>
          </div>
          <div className={s.right}>
            <FaqAccordion items={ items } locale={ locale } theme={ theme } />
          </div>
        </div>
      </SectionContainer>
    </Section>
  );
}
