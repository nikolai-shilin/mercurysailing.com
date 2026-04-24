import s from "./s.module.css";
import { getHeaderColor, type Theme } from "types/theme";
import { useMemo } from 'react';
import { getTitleText } from 'utils/getTitleText';



export type PageTitleProps = {
  section?: string;
  title?: string;
  theme?: Theme;
  index?: number;
  level?: 'h1' | 'h2' | 'h3';
};




export function SectionTitle({ section, title, theme = 'white', index = 0, level = 'h2' }: PageTitleProps) {

  const color = useMemo(() => getHeaderColor(theme), [theme]);

  const parsedTitle = useMemo(() => {
    return getTitleText(title ?? '');
  }, [title]);

  const Tag = level;

  return (
    <div className={ s.container } style={ { color } }>
      <div className={ s.section } dangerouslySetInnerHTML={ { __html: section ?? '' } } />
      <Tag className={ s.title } dangerouslySetInnerHTML={ { __html: parsedTitle } } />
    </div>
  );
}
