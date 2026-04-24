'use client';

import { getHeaderColor, getNavTextColor, type EmphasisColor, type Theme } from 'types/theme';
import { Section } from '../Section/Section';
import { SectionTitle } from 'components/Section/SectionTitle/SectionTitle';
import { SectionPreface } from '../SectionPreface/SectionPreface';
import { SectionContainer } from '../SectionContainer/SectionContainer';
import s from './s.module.css';
import Nav from 'components/Nav/Nav';
import { useMemo } from 'react';
import { SectionContainerTwo } from '../SectionContainerTwo/SectionContainerTwo';
import { ShowIf } from 'components/common/ShowIf/ShowIf';
import type { ButtonProps } from 'components/common/Button/Button';
import { ActionBlock } from '../ActionBlock/ActionBlock';
import type { Locale } from 'lib/i18n';
import { SectionText } from '../SectionText/SectionText';
import Image from 'next/image';




export type SectionWithHalfImageAndChildrenProps = {
  title: string;
  section: string;
  theme: Theme;
  showNav?: boolean;
  preface: string;
  text?: string;
  cover: string;
  action?: ButtonProps;
  description?: string;
  children: React.ReactNode;
  fullscreen?: boolean;
  locale: Locale;
}




export function SectionWithHalfImageAndChildren({ title, section, action, theme = 'white', preface, cover, showNav = false, text, description, children, fullscreen = false, locale = 'en' }: SectionWithHalfImageAndChildrenProps) {
  const navColor = useMemo(() => getNavTextColor(theme), [theme]);

  const isValidCover = cover && (cover.startsWith('/') || cover.startsWith('http'));

  return (
    <Section theme={ theme } style={ { minHeight: fullscreen ? '100vh' : 'auto' } }>
      <ShowIf condition={showNav}>
        <SectionContainer>
          <Nav color={ navColor } theme={ theme } locale={ locale } />
        </SectionContainer>
        </ShowIf>
      <SectionContainerTwo>
        <div className={s.left}>
          <div className={s.header}>
            <SectionTitle title={title} section={section} theme={theme} level="h1" />
            <SectionPreface text={ preface } theme={ theme } style={ { maxWidth: '100%' } } />
            <SectionText text={ description } theme={ theme } />
            {children}
          </div>
          <ActionBlock
            action={ {
              ...action,
              color: 'blue' as EmphasisColor,
              stretch: false,
            } }
          />
        </div>
        <div className={ s.image }>
          { isValidCover && (
            <Image
              src={ cover }
              alt={ title }
              fill
              sizes="(min-width: 1440px) 700px, (min-width: 768px) 50vw, 100vw"
              style={ { objectFit: 'cover', objectPosition: 'center' } }
            />
          ) }
        </div>
      </SectionContainerTwo>
    </Section>
  );
}
