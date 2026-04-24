import s from "./s.module.css";




export type SectionContainerThreeProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
}




export function SectionContainerThree({ children, style }: SectionContainerThreeProps) {
  return (
    <div className={ s.container } style={ { ...style } }>
      { children }
    </div>
  );
}
