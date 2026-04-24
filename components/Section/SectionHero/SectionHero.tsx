'use client';

import Nav from 'components/Nav/Nav';
import { SectionContainer } from '../SectionContainer/SectionContainer';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { SectionPreface } from '../SectionPreface/SectionPreface';
import { Button } from 'components/common/Button/Button';
import type { ButtonProps } from 'components/common/Button/Button';
import type { Locale } from 'lib/i18n';
import s from './s.module.css';
import { Section } from '../Section/Section';
import Image from 'next/image';
import { ShowIf } from 'components/common/ShowIf/ShowIf';




export type SectionHeroProps = {
  title?: string;
  section?: string;
  description?: string;
  image?: string;
  action?: ButtonProps;
  /**
   * Lower-commitment secondary action rendered next to `action` as an inline
   * underlined link (e.g. "How it works in 5 steps" on the homepage hero).
   * Hidden below 480 px to keep mobile fold uncluttered.
   */
  secondaryAction?: { label: string; to: string };
  locale?: Locale;
  showNav?: boolean;
  showOverlay?: boolean;
  /** Set true when the hero is the page's LCP element (above the fold). Defaults to true. */
  priority?: boolean;
}




export function SectionHero({
  title = '',
  section = '',
  description = '',
  image,
  action,
  secondaryAction,
  locale = 'en',
  showNav = false,
  showOverlay = true,
  priority = true,
}: SectionHeroProps) {
  return (
    <Section theme="black" style={ { minHeight: '100dvh', position: 'relative' } }>
      <ShowIf condition={!!image}>
        <Image
          src={image!}
          alt={title}
          className={s.image}
          fill
          priority={priority}
          sizes="(min-width: 1440px) calc(100vw - 8rem), (min-width: 768px) calc(100vw - 6rem), 100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </ShowIf>
      <ShowIf condition={ showOverlay }>
        <div className={ s.overlay } />
      </ShowIf>

      <div className={s.content}>
        <ShowIf condition={ showNav }>
        <SectionContainer>
            <Nav color="white" theme="black" locale={ locale } />
          </SectionContainer>
        </ShowIf>
        <SectionContainer style={{ flex: 0}}>
          <div className={s.header}>
            <SectionTitle title={title} section={section} theme="black" level="h1" />
            <SectionPreface text={description} theme="black" />
            {action?.label && (action?.to || action?.onClick) && (
              <div className={ s.ctaRow }>
                <Button
                  {...action}
                  color="white"
                  withBorder
                  withArrow
                />
                {secondaryAction?.label && secondaryAction?.to && (
                  <div className={ s.secondaryCtaWrap }>
                    <Button
                      label={ secondaryAction.label }
                      to={ secondaryAction.to }
                      color="white"
                      // withArrow
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </SectionContainer>
      </div>
    </Section>
  );
}
