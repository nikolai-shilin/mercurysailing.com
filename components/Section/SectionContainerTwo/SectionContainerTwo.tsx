import s from "./s.module.css";




export type SectionContainerTwoProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
}




export function SectionContainerTwo({ children, style }: SectionContainerTwoProps) {
  return (
    <div className={ s.container } style={ { ...style } }>
      { children }
    </div>
  );
}