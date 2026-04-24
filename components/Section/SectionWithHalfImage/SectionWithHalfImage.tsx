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
import { SectionText } from '../SectionText/SectionText';
import { ActionBlock } from '../ActionBlock/ActionBlock';
import type { Locale } from 'lib/i18n';
import Image from 'next/image';




export type SectionWithHalfImageProps = {
  title?: string;
  section?: string;
  theme?: Theme;
  showNav?: boolean;
  actionText?: React.ReactNode;
  description?: string;
  text?: string;
  image?: string;
  action?: ButtonProps;
  fullscreen?: boolean;
  locale?: Locale;
  priority?: boolean;
}




export function SectionWithHalfImage({
  title = '',
  section = '',
  action,
  actionText,
  theme = 'white',
  description = '',
  image = '',
  showNav = false,
  text,
  fullscreen = false,
  locale = 'en',
  priority = false,
}: SectionWithHalfImageProps) {

  const navColor = useMemo(() => getNavTextColor(theme), [theme]);

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
            <SectionTitle title={title} section={section} theme={theme} level={ showNav ? 'h1' : 'h2' } />
            <SectionPreface text={ description } theme={ theme } style={ { maxWidth: '100%' } } />
            <SectionText text={ text } theme={ theme } />
          </div>
          <ActionBlock
            action={ {
              ...action,
              color: 'blue' as EmphasisColor,
              stretch: false,
            } }
            locale={ locale }
            text={ actionText }
          />
        </div>
        <ShowIf condition={ !!image }>
        <div className={ s.image }>
          { image && (image.startsWith('/') || image.startsWith('http')) && <Image src={ image } fill sizes="(min-width: 1440px) calc(50vw - 8rem), (min-width: 768px) calc(50vw - 6rem), 100vw" priority={ priority } style={ { objectFit: 'cover', objectPosition: 'center' } } alt={ title } /> }
          </div>
        </ShowIf>
      </SectionContainerTwo>
    </Section>
  );
}
