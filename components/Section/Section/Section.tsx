import { getBackgroundColor, type Theme } from 'types/theme';
import s from "./s.module.css";
import { useMemo } from 'react';


export type SectionProps = {
  children: React.ReactNode;
  theme: Theme;
  transparent?: boolean;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export function Section({ children, theme, transparent = false, style, 'aria-label': ariaLabel }: SectionProps) {

  const bgColor = useMemo(() => getBackgroundColor(theme), [theme]);

  return (
    <section
      className={ s.container }
      aria-label={ ariaLabel }
      style={ { backgroundColor: transparent ? 'transparent' : bgColor, ...style } }
    >
      { children }
    </section>
  );
}