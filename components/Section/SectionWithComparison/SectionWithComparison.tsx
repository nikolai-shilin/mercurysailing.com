import { Section } from '../Section/Section';
import { SectionContainer } from '../SectionContainer/SectionContainer';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { SectionPreface } from '../SectionPreface/SectionPreface';
import type { Locale } from 'lib/i18n';
import getDict from './dict';
import s from './s.module.css';
import { Button } from 'components/common/Button/Button';
import type { Theme } from 'types/theme';
import { Check, ThumbsDown, ThumbsUp } from 'lucide-react';




export type SectionWithComparisonProps = {
  locale: Locale;
  theme?: Theme;
}




export function SectionWithComparison({ locale, theme='dark' }: SectionWithComparisonProps) {
  const d = getDict(locale);

  return (
    <Section theme={theme} aria-label={ d.title }>
      <SectionContainer>
        <SectionTitle title={ d.title } section={ d.section } theme={theme} level="h2" />
      </SectionContainer>
      <SectionContainer>
        <SectionPreface text={ d.description } theme={theme} />
      </SectionContainer>
      <SectionContainer>
        <div className={ s.tableWrapper }>
          <table className={ s.table }>
            <thead>
              <tr>
                <th className={ s.sectionTitleTd } />
                { d.columns.map((col, i) => (
                  <th key={ i } className={ s.sectionTitleTd }>
                    <h3 className={ s.title }>{ col.name }</h3>
                    <p className={ s.description }>{ col.tagline }</p>
                  </th>
                )) }
              </tr>
            </thead>
            <tbody>
              { d.rows.map((row, ri) => (
                <tr key={ ri }>
                  <td className={ s.descriptionTd }>
                    <h3 className={ s.title }>{ row.label }</h3>
                    { row.sub && <p className={ s.description }>{ row.sub }</p> }
                  </td>
                  { row.values.map((val, ci) => (
                    <td key={ ci } className={ s.valueTd }>
                      <ValueIcon value={ val } />
                    </td>
                  )) }
                </tr>
              )) }
            </tbody>
          </table>
        </div>
      </SectionContainer>
    </Section>
  );
}




function ValueIcon({ value }: { value: 'yes' | 'partial' | 'no' }) {
  if (value === 'yes')     return <span className={ s.yes }    aria-label="Yes"><ThumbsUp /></span>;
  if (value === 'partial') return <span className={ s.partial } aria-label="Partial">&ndash;</span>;
  return                          <span className={ s.no }     aria-label="No"><ThumbsDown /></span>;
}
