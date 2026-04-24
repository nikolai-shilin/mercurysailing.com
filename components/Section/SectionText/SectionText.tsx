import { useMemo } from 'react';
import s from "./s.module.css";
import { getTextColor, type Theme } from 'types/theme';
import { getParagraphedText } from 'utils/getParagraphedText';


export type SectionTextProps = {
  text?: string;
  theme: Theme;
  style?: React.CSSProperties;
}

export function SectionText({ text, theme, style }: SectionTextProps) {
  const color = useMemo(() => getTextColor(theme), [theme]);
  if (!text || text.trim() === '') return null;
  return (
    <div 
      className={ s.container }
      style={ { color, ...style } }
      dangerouslySetInnerHTML={ { __html: getParagraphedText(text) } }
    >
    </div>
  );
}
