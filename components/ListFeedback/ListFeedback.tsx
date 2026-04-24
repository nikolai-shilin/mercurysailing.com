'use client';

import { Fragment } from 'react/jsx-runtime';
import { For } from '../common/For/For';
import s from './s.module.css';
import { ListFeedbackItem } from './ListFeedbackItem/ListFeedbackItem';
import { useState } from 'react';
import { ShowIf } from '../common/ShowIf/ShowIf';
import type { Theme } from 'types/theme';
import type { ListItemProps } from 'types/list';
import type { Locale } from 'lib/i18n';
import getDict from './dict';




export type ListFeedbackProps = {
  items: ListItemProps[];
  theme?: Theme;
  locale?: Locale;
}




export default function ListFeedback({ items, theme = 'white', locale = 'en' }: ListFeedbackProps) {
  const [isOpen, setIsOpen] = useState(false);
  const d = getDict(locale);

  let background = ``;
  let color = ``;
  let backgroundColor = ``;

  switch (theme) {
    case 'white':
      background = `linear-gradient(to bottom, transparent, transparent 50%, var(--color-white) 100%)`;
      color = `var(--color-black)`;
      backgroundColor = `var(--color-white)`;
      break;
    case 'black':
      background = `linear-gradient(to bottom, transparent, transparent 50%, var(--color-black) 100%)`;
      color = `var(--color-white)`;
      backgroundColor = `var(--color-black)`;
      break;
    case 'light':
      background = `linear-gradient(to bottom, transparent, transparent 50%, var(--color-light) 100%)`;
      color = `var(--color-black)`;
      backgroundColor = `var(--color-light)`;
      break;
    case 'dark':
      background = `linear-gradient(to bottom, transparent, transparent 50%, var(--color-dark) 100%)`;
      color = `var(--color-white)`;
      backgroundColor = `var(--color-dark)`;
      break;
  }

  return (<>
    <div
      className={ s.container }
      style={ { maxHeight: isOpen ? '5000px' : '400px' } }>
      <For list={ items } itemFn={ (item, index) => (
        <Fragment key={ index }>
          <ListFeedbackItem
            { ...item }
            theme={ theme }
          />
        </Fragment>
      ) } />
      <ShowIf condition={ !isOpen }>
        <div
          className={ s.gradient }
          style={ { background } }>
          <button
            className={ s.button }
            style={ { backgroundColor } }
            onClick={ () => setIsOpen(true) }>
            &darr; { d.showMore }
          </button>
        </div>
      </ShowIf>
    </div>
    <ShowIf condition={ isOpen }>
      <div
        className={ s.bottom }
        style={ { background } }>
        <button
          className={ s.button }
          style={ { backgroundColor } }
          onClick={ () => setIsOpen(false) }>
          &uarr; { d.showLess }
        </button>
      </div>
    </ShowIf>
  </>
  );
}