import s from "./s.module.css";




export type SectionContainerProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
}




export function SectionContainer({ children, style }: SectionContainerProps) {
  return (
    <div className={ s.container } style={ { ...style } }>
      { children }
    </div>
  );
}