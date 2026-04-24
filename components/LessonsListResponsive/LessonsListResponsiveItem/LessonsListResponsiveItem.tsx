'use client';

import type { Theme } from 'types/theme';
import { ListOfLinks } from '../../common/ListOfLinks/ListOfLinks';
import { ShowIf } from '../../common/ShowIf/ShowIf';
import s from './s.module.css';
import { ListIcon } from '../../common/ListIcon/ListIcon';
import { useState } from 'react';




export type LessonsListResponsiveItemProps = {
  subtitle?: string;
  title: string;
  index?: number;
  short?: string;
  long: string;
  links?: {
    label: string;
    url: string;
  }[];
  theme?: Theme;
};




export const LessonsListResponsiveItem = ({ title, index, short, long, links, theme = 'white', subtitle }: LessonsListResponsiveItemProps) => {

  let color = 'var(--color-black)';
  let colorLong = 'var(--color-text-on-white)';
  switch (theme) {
    case 'black':
      color = 'var(--color-white)';
      colorLong = 'var(--color-text-on-dark)';
      break;
    case 'dark':
      color = 'var(--color-white)';
      colorLong = 'var(--color-text-on-dark)';
      break;
    case 'light':
      color = 'var(--color-black)';
      colorLong = 'var(--color-text-on-white)';
      break;
  }

  return <div className={ s.container }>
    <ShowIf condition={ index !== undefined }>
      <div className={ s.index }>
        <ListIcon index={ index || 0 } color={ color } />
      </div>
    </ShowIf>
    <div className={ s.content }>
      <ShowIf condition={ title !== undefined }>
        <h2
          className={ s.title }
          style={ { color } }>
          <ShowIf condition={ subtitle !== undefined }>
            <span className={ s.subtitle }>{ subtitle }</span>
            { ' ' }
          </ShowIf>
          { title }
        </h2>
      </ShowIf>
      <ShowIf condition={ short !== undefined }>
        <p className={ s.short } style={ { color } }>{ short }</p>
      </ShowIf>
      <ShowIf condition={ long !== undefined }>
        <p className={ s.long } style={ { color: colorLong } }>{ long }</p>
      </ShowIf>
      <ShowIf condition={ links !== undefined }>
        <div className={ s.links }>
          <ListOfLinks items={ links as unknown as { label: string; to: string }[] } inline={ false } />
        </div>
      </ShowIf>
    </div>
  </div>;
};