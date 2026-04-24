import { getNavTextColor, type EmphasisColor, type Theme } from 'types/theme';
import { Section } from '../Section/Section';
import { SectionTitle } from 'components/Section/SectionTitle/SectionTitle';
import { SectionPreface } from '../SectionPreface/SectionPreface';
import { SectionContainer } from '../SectionContainer/SectionContainer';
import { PriceTable } from './PriceTable/PriceTable';
import s from './s.module.css';
import { type ButtonProps } from 'components/common/Button/Button';
import { ShowFromSm } from 'components/common/ShowFromSm/ShowFromSm';
import { ShowToSm } from 'components/common/ShowToSm/ShowToSm';
import type { ExcludedPriceItemType, IncludedPriceItemType, TotalPriceType } from 'types/data/PriceType';
import { SectionText } from '../SectionText/SectionText';
import { ShowIf } from 'components/common/ShowIf/ShowIf';
import Nav from 'components/Nav/Nav';
import { useMemo } from 'react';
import { ActionBlock } from '../ActionBlock/ActionBlock';
import { ActionSubmitBlock } from '../ActionBlock/ActionSubmitBlock';
import type { Locale } from 'lib/i18n';




export type SectionWithPricesProps = {
  title?: string;
  section?: string;
  theme: Theme;
  description?: string;
  text?: string;
  action?: ButtonProps;
  included?: IncludedPriceItemType[];
  excluded?: ExcludedPriceItemType[];
  total?: TotalPriceType;
  currency: string;
  form?: React.ReactNode;
  formId?: string;
  showNav?: boolean;
  locale?: Locale;
}




export function SectionWithPrices({
  title = '',
  section = '',
  action,
  theme,
  description = '',
  text,
  included = [],
  excluded = [],
  total,
  currency = 'EUR',
  form,
  formId,
  showNav,
  locale = 'en'
}: SectionWithPricesProps) {

  const navColor = useMemo(() => getNavTextColor(theme), [theme]);

  return (
    <Section theme={ theme }>
      <ShowIf condition={ !!showNav }>
      <SectionContainer>
          <Nav color={ navColor } theme={ theme } locale={ locale } />
        </SectionContainer>
      </ShowIf>
      <SectionContainer>
        <div className={ s.grid }>
          <div className={ s.left }>
            <div className={ s.header }>
              <SectionTitle title={ title } section={ section } theme={ theme } level="h2" />
              <SectionPreface text={ description } theme={ theme } style={ { maxWidth: '100%' } } />
              <SectionText text={ text } theme={ theme } />
            </div>
            <ShowIf condition={ !!form }> { form } </ShowIf>
            <ShowFromSm>
              { formId ? (
                <ActionSubmitBlock
                  formId={ formId }
                  action={ {
                    ...action,
                    color: 'blue' as EmphasisColor,
                    stretch: false,
                  } }
                  locale={ locale }
                />
              ) : (
                <ActionBlock
                  action={ {
                    ...action,
                    color: 'blue' as EmphasisColor,
                    stretch: false,
                  } }
                    locale={ locale }
                />
              ) }
            </ShowFromSm>
          </div>
          <div className={ s.right }>
            <PriceTable
              included={ included }
              currency={ currency }
              excluded={ excluded }
              total={ total }
              locale={ locale }
            />
            <ShowToSm>
              { formId ? (
                <ActionSubmitBlock
                  formId={ formId }
                  action={ {
                    ...action,
                    color: 'blue' as EmphasisColor,
                    stretch: true,
                  } }
                  locale={ locale }
                />
              ) : (
                <ActionBlock
                  action={ {
                    ...action,
                    color: 'blue' as EmphasisColor,
                    stretch: true,
                  } }
                    locale={ locale }
                />
              ) }
            </ShowToSm>
          </div>
        </div>
      </SectionContainer>
    </Section>
  );
}
