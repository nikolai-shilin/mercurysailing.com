import { ArrowLeft, ArrowRight, ChevronsLeft, ChevronsRight, Minus, Plus } from 'lucide-react';
import { SectionIconButton } from 'components/Section/SectionIconButton/SectionIconButton';
import { ICON_STYLES } from 'types/styles/button';
import s from './s.module.css';




export type ControlScrollProps = {
  onScrollLeft: () => void;
  onScrollRight: () => void;
}




export function ControlScroll({
  onScrollLeft,
  onScrollRight,
}: ControlScrollProps) {
  return (
    <div className={ s.controlScroll }>
      <SectionIconButton
        onClick={ onScrollLeft }
      >
        <ArrowLeft { ...ICON_STYLES } />
      </SectionIconButton>
      <SectionIconButton
        onClick={ onScrollRight }
      >
        <ArrowRight { ...ICON_STYLES } />
      </SectionIconButton>
    </div>
  )
}