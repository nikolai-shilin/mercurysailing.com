'use client';

import { For } from '../common/For/For';
import { Fragment } from 'react/jsx-runtime';
import { Logo } from '../common/Logo/Logo';
import { nav, social, tech } from "../../data/nav";
import { LocaleLink } from '../common/LocaleLink';
import { usePathname } from "next/navigation";
import { ShowFromSm } from '../common/ShowFromSm/ShowFromSm';
import { ShowToSm } from '../common/ShowToSm/ShowToSm';
import s from "./s.module.css";
import { useEffect, useMemo, useState } from 'react';
import { ShowIf } from '../common/ShowIf/ShowIf';
import { getHeaderColor, type Theme } from 'types/theme';
import { Section } from '../Section/Section/Section';
import { SectionContainer } from '../Section/SectionContainer/SectionContainer';
import { Menu, X } from 'lucide-react';
import { ICON_STYLES } from 'types/styles/button';
import { getPathWithLocale, isLocale } from 'lib/i18n';
import type { Locale } from 'lib/i18n';
import Link from 'next/link';
import getDict from './dict';




type NavProps = {
  color: string;
  theme: Theme;
  type?: 'default' | 'admin';
  locale: Locale;
}




export default function Nav({
  color,
  theme,
  type = 'default',
  locale = 'en'
}: NavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const headerColor = useMemo(() => getHeaderColor(theme), [theme]);
  const isNavActive = (linkTo: string) => pathname === getPathWithLocale(linkTo, locale);
  const d = getDict(locale);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);


  return (
    <>
      <ShowToSm>
        <div className={ s.mobileMenuHeader }>
          <span className={ s.logoMobile }>
            <Logo color={ color } theme={ theme } locale={ locale } />
          </span>
          <div className={ s.vertical }>
            <button
              className={ s.menuButton }
              style={ { color: headerColor } }
              onClick={ () => setIsOpen(!isOpen) }>
              <Menu { ...ICON_STYLES } stroke={ headerColor } />
            </button>
            <LanguageSwitcher theme={ theme } />
          </div>
        </div>
        <ShowIf condition={ isOpen }>
          <div className={ s.mobileMenuContainer }>
            <Section theme="black" style={ { minHeight: '100dvh' } }>
              <SectionContainer>
                <div className={ s.mobileMenuHeader }>
                  <span className={ s.logoMobile }>
                    <Logo color={ 'yellow' } theme={ 'black' } locale={ locale } />
                  </span>
                  <div className={ s.vertical }>
                    <button
                      className={ s.menuButton }
                      style={ { color: 'var(--color-white)' } }
                      onClick={ () => setIsOpen(!isOpen) }>
                      <X { ...ICON_STYLES } stroke={ 'var(--color-white)' } />
                    </button>
                    <LanguageSwitcher theme={ 'black' } />
                  </div>
                </div>
              </SectionContainer>
              <SectionContainer style={ { display: 'flex', flexDirection: 'column', justifyContent: 'space-around', paddingBottom: '3rem', gap: '2rem' } }>
                <div className={ s.mobileMenuItems }>
                  <LocaleLink href={ `/` } className={ s.mobileMenuItem }>
                    { d.home }
                  </LocaleLink>
                  <For list={ nav } itemFn={ (link) =>
                    <Fragment key={ link.to }>
                      <LocaleLink href={ link.to } className={ s.mobileMenuItem }>
                        { link.label[locale] }
                      </LocaleLink>
                  </Fragment> } />
                </div>
                <div className={ s.mobileMenuItems } style={ { gap: '0.5rem' } }>
                  <For list={ tech } itemFn={ (link) => <Fragment key={ link.to }>
                    <LocaleLink href={ link.to } className={ s.mobileMenuItemTech }>
                      { link.label[locale] }
                    </LocaleLink>
                  </Fragment> } />
                </div>
                <div className={ s.mobileMenuItems } style={ { gap: '0.5rem' } }>
                  <For list={ social } itemFn={ (link) =>
                    <Fragment key={ link.to }>
                      <LocaleLink href={ link.to } className={ s.mobileMenuItemSocial } external={ !link.to.startsWith('/') }>
                        { link.label[locale] }
                      </LocaleLink>
                  </Fragment> } />
                </div>
              </SectionContainer>
            </Section>
          </div>
        </ShowIf>
      </ShowToSm>




      <ShowFromSm>
        <div className={ s.items }>
          <span className={ s.logoMobile }>
            <Logo color={ color } theme={ theme } locale={ locale } />
          </span>
          <For
            list={ nav }
            itemFn={ (link) => (
              <Fragment key={ link.to }>
                <LocaleLink
                  href={ link.to }
                  className={ isNavActive(link.to) ? s.itemActive : s.item }
                  style={ { color: headerColor } }
                  dangerouslySetInnerHTML={ { __html: link.label[locale] } }
                />
              </Fragment>)
            } />
          <LanguageSwitcher theme={ theme } />
        </div>
      </ShowFromSm>
    </>
  );
}


const LanguageSwitcher = ({ theme }: { theme: Theme }) => {
  const pathname = usePathname();
  const headerColor = useMemo(() => getHeaderColor(theme), [theme]);

  const switchLocale = (locale: Locale) => {
    const segments = pathname?.split('/').filter(Boolean) ?? [];
    if (segments.length === 0) return `/${ locale }`;
    if (isLocale(segments[0])) {
      segments[0] = locale;
      return '/' + segments.join('/');
    }
    return `/${ locale }${ pathname?.startsWith('/') ? pathname : '/' + pathname }`;
  }

  return (
    <div>
      <ShowIf condition={ pathname?.startsWith('/ru') }>
        <Link
          href={ switchLocale('en') }
          className={ s.localeLink }
          style={ { color: headerColor } }
        >EN</Link>
      </ShowIf>
      <ShowIf condition={ pathname?.startsWith('/en') }>
        <Link
          href={ switchLocale('ru') }
          className={ s.localeLink }
          style={ { color: headerColor } }
        >RU</Link>
      </ShowIf>
    </div>
  );
}
