import s from './s.module.css';
import { Button, type ButtonProps } from 'components/common/Button/Button';
import { type ContactLinks, type SocialLinks } from 'types/contacts';
import { DEFAULT_CONTACTS, DEFAULT_SOCIAL_LINKS } from 'data/contacts';
import getDict from './dict';
import type { Locale } from 'lib/i18n';

export type ActionBlockProps = {
  text?: React.ReactNode;
  action: ButtonProps;
  locale?: Locale;
};





export const ActionBlock = ({
  action,
  text,
  locale = 'en',
}: ActionBlockProps) => {
  const d = getDict(locale);
  if (!action.to && !action.onClick) return null;

  return (
    <div className={ s.action }>
      <Button
        label={ action.label }
        to={ action.to }
        color={ action.color }
        stretch={ action.stretch }
        withBorder={ action.withBorder }
        withBlur={ action.withBlur }
        withShadow={ action.withShadow }
        withArrow={ action.withArrow }
        onClick={ action.onClick }
      />
      { text }
      <div dangerouslySetInnerHTML={ { __html: d.gotQuestions } } />
    </div>
  )
}