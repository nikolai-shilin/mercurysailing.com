'use client';

import { getNavTextColor, type Theme } from 'types/theme';
import { Section } from '../Section/Section';
import { SectionTitle } from 'components/Section/SectionTitle/SectionTitle';
import { SectionPreface } from '../SectionPreface/SectionPreface';
import { SectionContainer } from '../SectionContainer/SectionContainer';
import { SectionGallery } from '../SectionGallery/SectionGallery';
import { useMemo, useState } from 'react';
import { ControlScroll } from 'components/SectionBooking/ControlScroll';
import { ShowFromSm } from 'components/common/ShowFromSm/ShowFromSm';
import { ShowIf } from 'components/common/ShowIf/ShowIf';
import type { ButtonProps } from 'components/common/Button/Button';
import type { Locale } from 'lib/i18n';
import Nav from 'components/Nav/Nav';
import type { EventType } from 'types/data/EventType';
import type { Scarcity } from 'utils/scarcity';




export type ProductLine = 'no-worry' | 'shared' | 'vacation';

export type GalleryItem = {
  src: string;
  description: string;
  title: string;
  to?: string;
  tags?: string[];
  theme?: Theme;
  events?: EventType[];
  tag?: { duration: number; price: number; from?: boolean; };
  productLine?: ProductLine;
  /**
   * Scarcity signal for the next upcoming departure represented by this card.
   * Computed by callers via utils/scarcity.ts. Pass null/undefined to hide.
   */
  scarcity?: Scarcity | null;
}

export type SectionWithGalleryProps = {
  title?: string;
  section?: string;
  theme: Theme;
  description?: string;
  gallery: GalleryItem[];
  action?: ButtonProps;
  showNav?: boolean;
  locale?: Locale;
  /** Preload the first gallery image. Set true only when this gallery is the page's LCP element. */
  priority?: boolean;
}




export function SectionWithGallery({ title, section, theme, description, gallery, showNav = false, locale = 'en', priority = false }: SectionWithGalleryProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const navColor = useMemo(() => getNavTextColor(theme), [theme]);

  const onScrollLeft = () => {
    if (scrollPosition > 0) setScrollPosition(prev => prev - 1);
  };

  const onScrollRight = () => {
    if (scrollPosition < gallery.length - 1) setScrollPosition(prev => prev + 1);
  };

  return (
    <Section theme={ theme }>
      <ShowIf condition={ showNav }>
        <SectionContainer>
          <Nav color={ navColor } theme={ theme } locale={ locale } />
        </SectionContainer>
      </ShowIf>
      <SectionContainer>
        <SectionTitle title={ title } section={ section } theme={ theme } level={ showNav ? 'h1' : 'h2' } />
      </SectionContainer>
      <SectionContainer>
        <SectionPreface text={ description } theme={ theme } />
        <ShowFromSm>
          <ShowIf condition={ gallery.length > 1 }>
            <div style={ {
              position: 'absolute',
              right: 'var(--spacing-lg)',
              transform: 'translateY(-100%)',
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
        priority={ priority }
      />
    </Section>
  );
}
