'use client';

import { For } from 'components/common/For/For';
import type { GalleryItem } from '../SectionWithGallery/SectionWithGallery';
import { ShowIf } from 'components/common/ShowIf/ShowIf';
import s from './s.module.css';
import type { Theme } from 'types/theme';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { getBackgroundImageColor, getHeaderColor, getTextColor } from 'types/theme';
import Link from 'next/link';
import Image from 'next/image';
import { SCREEN_BREAKPOINTS } from 'data/breakpoints';
import { convertRemToPx } from 'utils/convertRemToPx';
import type { Locale } from 'lib/i18n';
import { EventsTable } from 'components/EventsTable/EventsTable';
import { Tag } from 'components/common/Tag/Tag';
import { ScarcityBadge } from 'components/common/ScarcityBadge/ScarcityBadge';


const DICT = {
  en: {
    seeBetter: 'View larger',
    seeMore: 'Learn more',
    noWorry: 'All-inclusive · Fixed price',
    shared: 'Shared charter · Cost-split',
    vacation: 'Vacation · All-inclusive',
  },
  ru: {
    seeBetter: 'Смотреть лучше',
    seeMore: 'Подробнее',
    noWorry: 'Всё включено · Фикс. цена',
    shared: 'Совместный чартер · Делим расходы',
    vacation: 'Каникулы · Всё включено',
  },
} as const;


export type SectionGalleryProps = {
  gallery: GalleryItem[];
  theme: Theme;
  scrollPosition: number;
  setScrollPosition: (position: number) => void;
  locale: Locale;
  /** Preload the first slide image. Set true only when the gallery is the LCP element. */
  priority?: boolean;
}


export function SectionGallery({ gallery, theme, scrollPosition, setScrollPosition, locale, priority = false }: SectionGalleryProps) {
  const colorText = useMemo(() => getTextColor(theme), [theme]);
  const colorHeader = useMemo(() => getHeaderColor(theme), [theme]);
  const ref = useRef(null);
  const backgroundImageColor = useMemo(() => getBackgroundImageColor(theme), [theme]);
  const d = DICT[locale] ?? DICT.en;

  const getSpacingLeftPx = useCallback(() => {
    const windowWidth = window.innerWidth;
    let spacingLeft = getComputedStyle(document.documentElement).getPropertyValue('--spacing-xs');
    if (windowWidth > SCREEN_BREAKPOINTS.md && windowWidth < SCREEN_BREAKPOINTS.lg) {
      spacingLeft = getComputedStyle(document.documentElement).getPropertyValue('--spacing-md');
    } else if (windowWidth > SCREEN_BREAKPOINTS.lg) {
      spacingLeft = getComputedStyle(document.documentElement).getPropertyValue('--spacing-lg');
    }
    return convertRemToPx(spacingLeft);
  }, []);

  const handleScrollToSlideByIndex = useCallback((index: number) => {
    const slideId = document.getElementById('slide-' + index);
    const slideOffset = slideId?.offsetLeft ?? 0;
    if (ref.current) {
      (ref.current as HTMLElement).scrollTo({
        top: 0,
        left: slideOffset - getSpacingLeftPx(),
        behavior: 'smooth',
      });
    }
  }, [getSpacingLeftPx]);

  useEffect(() => {
    handleScrollToSlideByIndex(scrollPosition);
  }, [scrollPosition, handleScrollToSlideByIndex]);

  const handleImageClick = useCallback((index: number) => {
    setScrollPosition(index);
  }, [setScrollPosition]);

  if (!gallery?.length) return null;

  return (
    <div className={s.container} ref={ref}>
      <For list={gallery} itemFn={(item, index) => (
        <div className={s.slide} key={index} id={'slide-' + index.toString()}>
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => handleImageClick(index)}
              className={s.image}
              title={d.seeBetter}
              style={{ backgroundColor: backgroundImageColor }}
            >
              {item.src && (
                <Image
                  src={item.src}
                  fill
                  sizes="(min-width: 1440px) 800px, (min-width: 768px) 600px, 320px"
                  priority={priority && index === 0}
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  alt={item.title || item.description || 'Workation photo'}
                />
              )}

            </div>
            {item.tag && (
              <div style={{
                position: 'absolute',
                bottom: 'calc(-1*1.25rem)',
                right: 'calc(1.25rem)'
              }}>
                <Tag
                  duration={item?.tag?.duration}
                  price={item?.tag?.price}
                  from={item?.tag?.from}
                  currency='EUR'
                  locale={locale}
                />
              </div>
            )}
          </div>


          <div className={s.text} style={{ color: colorText }}>
            <ShowIf condition={!!item.productLine}>
              <div className={s.productChip} style={{ color: colorHeader }}>
                {item.productLine === 'shared' ? d.shared : item.productLine === 'vacation' ? d.vacation : d.noWorry}
              </div>
            </ShowIf>
            <ShowIf condition={!!item.scarcity}>
              <div style={{ marginBottom: '0.5rem' }}>
                <ScarcityBadge scarcity={item.scarcity ?? null} locale={locale} theme={theme} />
              </div>
            </ShowIf>
            <ShowIf condition={item.title}>
              <strong style={{ color: colorHeader }}>{item.title}{'. '}</strong>
            </ShowIf>
            {item.description}
            <ShowIf condition={item.to}>
              {' '}
              <Link href={item.to}>
                <span>{d.seeMore} &rarr;</span>
              </Link>
            </ShowIf>
          </div>

          <ShowIf condition={item.events}>
            <EventsTable events={item.events} locale={locale} theme={theme} />
          </ShowIf>
        </div>
      )} />
    </div>
  );
}
