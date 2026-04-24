import { LocaleLink } from '../LocaleLink';
import s from './s.module.css';
import { getHeaderColor, type Theme } from 'types/theme';
import { useMemo } from 'react';
import type { Locale } from 'lib/i18n';
import getDict, { type DictType } from './dict';
import { ShowIf } from '../ShowIf/ShowIf';




export type LogoProps = {
  color: string,
  theme: Theme
  locale: Locale;
  noText?: boolean;
};




export const Logo = ({ color, theme, locale, noText = false }: LogoProps) => {

  let headerColor = useMemo(() => getHeaderColor(theme), [theme]);
  const d: DictType = useMemo(() => getDict(locale), [locale]);

  let logoSrc;
  switch (color) {
    case 'white':
      logoSrc = '/logos/logo-white.svg';
      break;
    case 'yellow':
      logoSrc = '/logos/logo-yellow.svg';
      break;
    case 'black':
      logoSrc = '/logos/logo-black.svg';
      break;
    default:
      logoSrc = '/logos/logo-white.svg';
      break;
  }

  return (
    <div className={ s.container }>
      <LocaleLink href="/">
        <img className={ s.logo } src={ logoSrc } alt="Wild Workation" />
      </LocaleLink>
      <ShowIf condition={ !noText }>
      <LocaleLink href="/" className={ s.logoLink }>
        <div className={ s.logoSubtext } style={ { color: headerColor } }>
            { d.text }
          </div>
        </LocaleLink>
      </ShowIf>
    </div>
  );
};