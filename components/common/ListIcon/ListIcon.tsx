export type ListIconProps = {
  index: number;
  color?: string;
};

export function ListIcon({ index, color }: ListIconProps) {
  // Generate path to icon in public folder
  const iconSrc = `/icons/r${ index }.svg`;

  return <img src={ iconSrc } alt="" aria-hidden="true" style={ color ? { color } : undefined } loading="lazy" />
}