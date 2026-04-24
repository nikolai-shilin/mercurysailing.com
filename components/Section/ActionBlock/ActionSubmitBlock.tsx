import s from '../ActionBlock/s.module.css';
import { Button, type ButtonProps } from 'components/common/Button/Button';
import { type ContactLinks, type SocialLinks } from 'types/contacts';
import { DEFAULT_CONTACTS, DEFAULT_SOCIAL_LINKS } from 'data/contacts';
import type { Locale } from 'lib/i18n';
import getDict from './dict';

export type ActionSubmitBlockProps = {
  contacts?: ContactLinks;
  social?: SocialLinks;
  action: ButtonProps;
  formId: string;
  locale?: Locale;
};




export const ActionSubmitBlock = ({
  contacts = DEFAULT_CONTACTS,
  social = DEFAULT_SOCIAL_LINKS,
  action,
  formId,
  locale = 'en',
}: ActionSubmitBlockProps) => {

  const d = getDict(locale);
  return (
    <div className={ s.action }>
      <Button
        label={ action.label }
        color={ action.color }
        stretch={ action.stretch }
        withBorder={ action.withBorder }
        withBlur={ action.withBlur }
        withShadow={ action.withShadow }
        withArrow={ action.withArrow }
        htmlType="submit"
        form={ formId }
      />
      <div dangerouslySetInnerHTML={ { __html: d.gotQuestions } } />
    </div>
  )
}
