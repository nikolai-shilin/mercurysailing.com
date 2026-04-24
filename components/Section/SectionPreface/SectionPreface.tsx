import { useMemo } from 'react';
import s from "./s.module.css";
import { getHeaderColor, type Theme } from 'types/theme';


export type SectionPrefaceProps = {
  text?: string;
  theme: Theme;
  style?: React.CSSProperties;
}

export function SectionPreface({ text = '', theme, style }: SectionPrefaceProps) {
  const color = useMemo(() => getHeaderColor(theme), [theme]);
  return (
    <div className={ s.container } style={ { color, ...style } }>
      { text }
    </div>
  );
}
