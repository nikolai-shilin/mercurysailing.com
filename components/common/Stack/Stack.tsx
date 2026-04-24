type SpacingSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';

const SPACING: Record<SpacingSize, string> = {
  xxs: 'var(--spacing-xxs)',
  xs:  'var(--spacing-xs)',
  sm:  'var(--spacing-sm)',
  md:  'var(--spacing-md)',
  lg:  'var(--spacing-lg)',
};

type StackProps = {
  children: React.ReactNode;
  gap?: SpacingSize;
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  style?: React.CSSProperties;
};

export function Stack({
  children,
  gap = 'xs',
  align = 'stretch',
  justify = 'flex-start',
  style,
}: StackProps) {
  return (
    <div style={ {
      display: 'flex',
      flexDirection: 'column',
      gap: SPACING[gap],
      alignItems: align,
      justifyContent: justify,
      ...style,
    } }>
      { children }
    </div>
  );
}
