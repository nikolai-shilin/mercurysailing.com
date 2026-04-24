'use client';

import { LocaleLink } from 'components/common/LocaleLink';
import { useRouter, usePathname } from 'next/navigation';
import { getPathWithLocale, getLocaleFromPathname } from 'lib/i18n';
import s from './s.module.css';
import type { EmphasisColor } from 'types/theme';

export type ButtonProps = {
  label?: string;
  to?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: EmphasisColor;
  stretch?: boolean;
  withShadow?: boolean;
  withBorder?: boolean;
  withBlur?: boolean;
  withArrow?: boolean;
  onClick?: () => void;
  htmlType?: 'button' | 'submit';
  form?: string;
};

export const Button = ({
  label,
  to,
  size = 'lg',
  color: colorProp,
  stretch = false,
  withShadow = false,
  withBorder = false,
  withBlur = false,
  withArrow = false,
  onClick,
  htmlType,
  form,
}: ButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname ?? '');

  let color = 'var(--color-blue)';
  switch (colorProp) {
    case 'red':
      color = 'var(--color-red)';
      break;
    case 'gray':
      color = 'var(--color-text)';
      break;
    case 'white':
      color = 'var(--color-white)';
      break;
    case 'yellow':
      color = 'var(--color-yellow)';
      break;
    case 'blue':
      color = 'var(--color-blue)';
      break;
    case 'black':
      color = 'var(--color-black)';
      break;
  }

  let fontSize;
  let padding;
  switch (size) {
    case 'sm':
      fontSize = '0.75rem';
      padding = '0.25rem 0.5rem';
      break;
    case 'md':
      fontSize = '0.875rem';
      padding = '0.5rem 1rem';
      break;
    case 'lg':
      fontSize = '1.25rem';
      padding = '0.75rem 1.5rem';
    default:
      fontSize = '1.25rem';
      padding = '0.75rem 1.5rem';
      break;
  }
  if (!to && !onClick && htmlType !== 'submit') return null;

  const handleClick = () => {
    if (to) {
      const path = to.startsWith('/') && !to.startsWith('//') ? getPathWithLocale(to, locale) : to;
      router.push(path);
    }
    if (onClick) {
      onClick();
    }
  };

  const styles = {
    width: stretch ? '100%' : 'fit-content',
    filter: withShadow ? `drop-shadow(0 0 1px rgba(0, 0, 0, 0.6))` : 'none',
    backdropFilter: withBlur ? `blur(.5rem) saturate(80%)` : 'none',
    border: withBorder ? `2px solid ${color}` : 'none',
    color: color,
    textAlign: stretch ? 'center' : 'left',
    fontSize: fontSize,
    padding: padding,
  } as React.CSSProperties;

  if (onClick || htmlType === 'submit') {
    return (
      <button
        className={s.button}
        style={styles}
        onClick={onClick ? handleClick : undefined}
        type={htmlType ?? 'button'}
        form={form}
      >
        {label} {withArrow && '→'}
      </button>
    );
  } else {
    return (
      <LocaleLink href={to ?? ''} className={s.button} style={styles}>
        {label} {withArrow && '→'}
      </LocaleLink>
    );
  }
};
