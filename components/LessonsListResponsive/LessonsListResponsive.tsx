'use client';

import { Fragment } from 'react/jsx-runtime';
import { For } from '../common/For/For';
import s from './s.module.css';
import { LessonsListResponsiveItem } from './LessonsListResponsiveItem/LessonsListResponsiveItem';
import { useState } from 'react';
import { ShowIf } from '../common/ShowIf/ShowIf';
import type { Theme } from 'types/theme';
import type { ListItemProps } from 'types/list';




export type LessonsListResponsiveProps = {
  items?: ListItemProps[];
  theme?: Theme;
  collapsable?: boolean;
}




export default function LessonsListResponsive({ items = [], theme = 'white', collapsable = true }: LessonsListResponsiveProps) {
  const [isOpen, setIsOpen] = useState(collapsable ? false : true);

  let background = ``;
  let color = ``;
  let backgroundColor = ``;
  switch (theme) {
    case 'white':
      background = `linear-gradient(to bottom, transparent, transparent 20%, var(--color-white) 100%)`;
      color = `var(--color-black)`;
      backgroundColor = `var(--color-white)`;
      break;
    case 'black':
      background = `linear-gradient(to bottom, transparent, transparent 20%, var(--color-black) 100%)`;
      color = `var(--color-white)`;
      backgroundColor = `var(--color-black)`;
      break;
    case 'light':
      background = `linear-gradient(to bottom, transparent, transparent 20%, var(--color-light) 100%)`;
      color = `var(--color-black)`;
      backgroundColor = `var(--color-light)`;
      break;
    case 'dark':
      background = `linear-gradient(to bottom, transparent, transparent 20%, var(--color-dark) 100%)`;
      color = `var(--color-white)`;
      backgroundColor = `var(--color-dark)`;
      break;
  }

  return (<>
    <div
      className={ s.container }
      style={ { gap: '1.5rem', maxHeight: isOpen ? '5000px' : '200px' } }>
      <For list={ items } itemFn={ (item, index) => (
        <Fragment key={ index }>
          <LessonsListResponsiveItem
            key={ index }
            subtitle={ item.subtitle }
            title={ item.title }
            index={ index + 1 }
            short={ item.short }
            long={ item.long }
            links={ item.links }
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
            &darr; Все уроки
          </button>
        </div>
      </ShowIf>
    </div>
    <ShowIf condition={ isOpen && collapsable }>
      <div
        className={ s.bottom }
        style={ { background } }>
        <button
          className={ s.button }
          style={ { backgroundColor } }
          onClick={ () => setIsOpen(false) }>
          &uarr; Скрыть уроки
        </button>
      </div>
    </ShowIf>
  </>
  );
}