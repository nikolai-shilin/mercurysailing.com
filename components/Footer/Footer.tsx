import { For } from '../common/For/For';
import { Fragment, useMemo } from 'react';
import { getNavTextColor, type Theme } from 'types/theme';
import { photographers, social, tech } from 'data/nav';
import { LocaleLink } from '../common/LocaleLink';
import { Section } from '../Section/Section/Section';
import { SectionContainer } from '../Section/SectionContainer/SectionContainer';
import Nav from '../Nav/Nav';
import s from './s.module.css';
import { getLocaleFromPathname, type Locale } from 'lib/i18n';
import getDict, { type DictType } from './dict';
import NavList from 'components/NavList/NavList';
import { type NavItem, social as socialItems } from 'data/nav';



export type FooterProps = {
  theme: Theme;
  locale: Locale;
}




export function Footer({ theme, locale }: FooterProps) {

  let navColor = useMemo(() => getNavTextColor(theme), [theme]);
  const d: DictType = useMemo(() => getDict(locale), [locale]);

  return (
    <footer>

      <Section theme="black" transparent={ true } style={ {
        backgroundImage: `url(${ '/bg-social-wild-workation.jpg' })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } }>
        <SectionContainer>
          <nav aria-label="Social media">
            <NavList items={ socialItems as NavItem[] } theme="black" locale={ locale } />
          </nav>
        </SectionContainer>
      </Section>

      <Section theme={ theme }>
        <SectionContainer style={ { maxWidth: '1400px' } }>
          <nav aria-label="Site navigation">
            <Nav theme={ theme } color={ navColor } locale={ locale } />
          </nav>
        </SectionContainer>

        {/* <SectionContainer>
          <div className={ s.socialItems }>
            <For list={ social } itemFn={ (link) => (
              <LocaleLink
                key={ link.to }
                href={ link.to }
                className={ s.socialItem }
                external={ !link.to.startsWith('/') }
              >
                { link.label[locale] }
              </LocaleLink>
            ) } />
          </div>
        </SectionContainer> */}

        <SectionContainer>
          <div className={ s.copyright }>
            { d.copyright }
            <div className={ s.phones }>
            <For list={ tech } itemFn={ (t, i) => (
                <Fragment key={ t.to }>
                  { i > 0 && ' · ' }
                  <LocaleLink href={ t.to } external>
                    { t.label[locale] }
                  </LocaleLink>
                </Fragment>
              ) } />

              {/* { ' · ' }
              <For list={ phones } itemFn={ (phone, index) => (
                <Fragment key={ phone.to }>
                  { index > 0 && ' · ' }
                  <span>{ phone.label[locale] + ': ' }</span>
                  <LocaleLink href={ 'tel:' + phone.to }>
                    { phone.label[locale] }
                  </LocaleLink>
                </Fragment>
              ) } /> */}
            </div>

            <div className={ s.photographers }>
              { d.usedPhotos }
              <For list={ photographers } itemFn={ (photographer) => (
                <Fragment key={ photographer.to }>
                  { ' · ' }
                  <LocaleLink href={ photographer.to } external rel="nofollow noopener noreferrer">
                    { photographer.label[locale] }
                  </LocaleLink>
                </Fragment>
              ) } />
            </div>
          </div>

          <div className={ s.fullcrimp }>
            { d.madeIn } <LocaleLink href="https://www.fullcrimp.com" style={ { textDecoration: 'none' } } target="_blank" rel="nofollow noopener noreferrer" external>&lt;fullcrimp.com /&gt;</LocaleLink>
          </div>
        </SectionContainer>
      </Section>

      {/* <Section theme="black" transparent={ true } style={ {
        backgroundImage: `url(${ '/bg-social-wild-workation.jpg' })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } }>
        <SectionContainer>
          <NavList items={ socialItems as NavItem[] } theme="black" locale={ locale } />
        </SectionContainer>
      </Section> */}
    </footer>
  );
}