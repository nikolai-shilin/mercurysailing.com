import s from './s.module.css';




export type SectionIconButtonProps = {
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}




export function SectionIconButton({ disabled, onClick, children }: SectionIconButtonProps) {
  return (
    <button
      type="button"
      className={ s.button }
      disabled={ disabled }
      onClick={ onClick }
    >{ children }</button>
  );
}