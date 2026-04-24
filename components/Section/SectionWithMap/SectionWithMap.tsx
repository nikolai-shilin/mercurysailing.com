'use client';

import { Section } from '../Section/Section';
import { SectionTitle } from 'components/Section/SectionTitle/SectionTitle';
import { SectionPreface } from '../SectionPreface/SectionPreface';
import { SectionContainer } from '../SectionContainer/SectionContainer';
import { SectionGallery } from '../SectionGallery/SectionGallery';
import type { GalleryItem } from '../SectionWithGallery/SectionWithGallery';
import s from './s.module.css';
import { ShowIf } from 'components/common/ShowIf/ShowIf';
import Image from 'next/image';
import type { ButtonProps } from 'components/common/Button/Button';
import { useState } from 'react';
import { ShowFromSm } from 'components/common/ShowFromSm/ShowFromSm';
import { ControlScroll } from 'components/SectionBooking/ControlScroll';
import type { Locale } from 'lib/i18n';




export type SectionWithMapProps = {
  title?: string;
  section?: string;
  description?: string;
  map?: string;
  gallery?: GalleryItem[];
  action?: ButtonProps;
  locale?: Locale;
}




export function SectionWithMap({
  title = '',
  section = '',
  description = '',
  map,
  gallery = [],
  locale = 'en'
}: SectionWithMapProps) {

  const [scrollPosition, setScrollPosition] = useState(0);

  const onScrollLeft = () => {
    if (scrollPosition > 0) {
      setScrollPosition(prev => prev - 1);
    }
  }

  const onScrollRight = () => {
    if (scrollPosition < gallery?.length - 1) {
      setScrollPosition(prev => prev + 1);
    }
  }

  return (
    <>
      <ShowIf condition={ !!map }>
        <div className={ s.mapWrapper }>
          <Image
            src={ map! }
            alt={ title }
            fill
            sizes="100vw"
            style={ { objectFit: 'cover', objectPosition: 'center', filter: 'sepia(25%) brightness(0.9)' } }
            priority
          />
          <div className={ s.gradient } />
        </div>
      </ShowIf>
      <Section
        theme='black'
        style={ {
          paddingTop: map ? 'calc(5rem*-1)' : undefined,
        } }
      >
        <SectionContainer>
          <SectionTitle title={ title } section={ section } theme='black' level="h2" />
        </SectionContainer>
        <SectionContainer>
          <SectionPreface text={ description } theme='black' />
          <ShowFromSm>
            <ShowIf condition={ gallery?.length > 1 }>
              <div style={ {
                position: 'absolute',
                right: 'var(--spacing-lg)',
                transform: 'translateY(-100%)'
              } }>
                <ControlScroll
                  onScrollLeft={ onScrollLeft }
                  onScrollRight={ onScrollRight }
                />
              </div>
            </ShowIf>
          </ShowFromSm>
        </SectionContainer>
        <SectionGallery
          gallery={ gallery }
          theme='black'
          scrollPosition={ scrollPosition }
          setScrollPosition={ setScrollPosition }
          locale={ locale }
        />
      </Section>
    </>
  );
}