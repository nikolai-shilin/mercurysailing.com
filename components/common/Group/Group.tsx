type SpacingSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';

const SPACING: Record<SpacingSize, string> = {
  xxs: 'var(--spacing-xxs)',
  xs:  'var(--spacing-xs)',
  sm:  'var(--spacing-sm)',
  md:  'var(--spacing-md)',
  lg:  'var(--spacing-lg)',
};

type GroupProps = {
  children: React.ReactNode;
  gap?: SpacingSize;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  wrap?: boolean;
  style?: React.CSSProperties;
};

export function Group({
  children,
  gap = 'xs',
  align = 'center',
  justify = 'flex-start',
  wrap = false,
  style,
}: GroupProps) {
  return (
    <div style={ {
      display: 'flex',
      flexDirection: 'row',
      gap: SPACING[gap],
      alignItems: align,
      justifyContent: justify,
      flexWrap: wrap ? 'wrap' : 'nowrap',
      ...style,
    } }>
      { children }
    </div>
  );
}
