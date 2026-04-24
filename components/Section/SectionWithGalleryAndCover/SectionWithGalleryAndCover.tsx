'use client';

import { getBackgroundColor, type EmphasisColor, type Theme } from 'types/theme';
import { Section } from '../Section/Section';
import { SectionTitle } from 'components/Section/SectionTitle/SectionTitle';
import { SectionPreface } from '../SectionPreface/SectionPreface';
import { SectionContainer } from '../SectionContainer/SectionContainer';
import { SectionGallery } from '../SectionGallery/SectionGallery';
import type { GalleryItem } from '../SectionWithGallery/SectionWithGallery';
import s from './s.module.css';
import { ShowIf } from 'components/common/ShowIf/ShowIf';
import { useState } from 'react';
import { ShowFromSm } from 'components/common/ShowFromSm/ShowFromSm';
import { ControlScroll } from 'components/SectionBooking/ControlScroll';
import Nav from 'components/Nav/Nav';
import type { Locale } from 'lib/i18n';
import Image from 'next/image';




export type SectionWithGalleryAndCoverProps = {
  title?: string;
  section?: string;
  description?: string;
  image?: string;
  theme: Theme;
  gallery: GalleryItem[];
  showNav?: boolean;
  locale?: Locale;
  priority?: boolean;
}




export function SectionWithGalleryAndCover({ title, section, description, image, theme, gallery, showNav = false, locale = 'en', priority = false }: SectionWithGalleryAndCoverProps) {

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
      <ShowIf condition={ !!image }>
        <div className={ s.cover } style={ { position: 'relative' } }>
          <Image src={ image! } fill sizes="100vw" priority={ priority } style={ { objectFit: 'cover', objectPosition: 'center' } } alt={ title ?? '' } />
          <ShowIf condition={ showNav }>
            <div className={ s.gradient } />
            <div style={ { position: 'relative', zIndex: 3 } }>
              <Section theme='black' transparent={ true }>
                <SectionContainer>
                  <Nav color='white' theme='black' locale={ locale } />
                </SectionContainer>
              </Section>
            </div>
          </ShowIf>
        </div>
      </ShowIf>
      <Section theme={ theme }>
        <SectionContainer>
          <SectionTitle title={ title } section={ section } theme={ theme } level="h2" />
        </SectionContainer>
        <SectionContainer>
          <SectionPreface text={ description } theme={ theme } />
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
          theme={ theme }
          scrollPosition={ scrollPosition }
          setScrollPosition={ setScrollPosition }
          locale={ locale }
        />
      </Section>
    </>
  );
}