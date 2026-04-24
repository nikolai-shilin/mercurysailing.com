'use client';

import { useEffect, useState } from 'react';
import { Button } from 'components/common/Button/Button';
import s from './s.module.css';

export type StickyPageNavItem = {
  label: string;
  /** Target element id on the current page (without the leading #). */
  anchor: string;
};

export type StickyPageNavCta = {
  label: string;
  /** Target element id on the current page (without the leading #). */
  anchor: string;
};

export type StickyPageNavProps = {
  items: StickyPageNavItem[];
  cta?: StickyPageNavCta;
  /** Distance from the top in px after which the nav appears. Defaults to 400. */
  showAfter?: number;
};

/**
 * Desktop-only sticky in-page navigation. Appears after the visitor scrolls
 * past a threshold (default 400px — below the hero) and smooth-scrolls to
 * section anchors on click. Hidden on mobile entirely.
 *
 * Kept as a single focused component so it can be reused on other long
 * listing pages (e.g. /shared-adventures) later.
 */
export function StickyPageNav({ items, cta, showAfter = 400 }: StickyPageNavProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScroll = () => setVisible(window.scrollY > showAfter);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [showAfter]);

  const scrollTo = (anchor: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById(anchor);
    if (!target) {
      // Fallback to hash so external browser behaviour still works.
      window.location.hash = anchor;
      return;
    }
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${ anchor }`);
  };

  return (
    <nav
      aria-label="Section navigation"
      className={ `${ s.wrap } ${ visible ? s.visible : '' }` }
    >
      <div className={ s.inner }>
        <ul className={ s.links }>
          { items.map((item) => (
            <li key={ item.anchor }>
              <a
                className={ s.link }
                href={ `#${ item.anchor }` }
                onClick={ scrollTo(item.anchor) }
              >
                { item.label }
              </a>
            </li>
          )) }
        </ul>
        { cta && (
          <Button
            label={ cta.label }
            onClick={ () => {
              const target = document.getElementById(cta.anchor);
              if (!target) {
                window.location.hash = cta.anchor;
                return;
              }
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              history.replaceState(null, '', `#${ cta.anchor }`);
            } }
            color="white"
            // size="sm"
            withBorder
            withArrow
          />
        ) }
      </div>
    </nav>
  );
}
