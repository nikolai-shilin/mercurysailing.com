'use client';

import { For } from '../common/For/For';
import { Fragment } from 'react/jsx-runtime';
import { type NavItem } from "../../data/nav";
import { LocaleLink } from '../common/LocaleLink';
import { usePathname } from "next/navigation";
import s from "./s.module.css";
import { useMemo } from 'react';
import { getHeaderColor, type Theme } from 'types/theme';
import { getPathWithLocale } from 'lib/i18n';
import type { Locale } from 'lib/i18n';
import { Logo } from 'components/common/Logo/Logo';




type NavProps = {
  theme: Theme;
  locale: Locale;
  items: NavItem[];
}




export default function NavList({
  theme,
  items =[],
  locale = 'en'
}: NavProps) {
  const pathname = usePathname();
  const headerColor = useMemo(() => getHeaderColor(theme), [theme]);
  const isNavActive = (linkTo: string) => pathname === getPathWithLocale(linkTo, locale);



  return (
    <>
      <div className={ s.items }>
        <Logo color={ headerColor } theme={ theme } locale={ locale } noText={ true } />
          <For
            list={ items }
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
        </div>
    </>
  );
}

