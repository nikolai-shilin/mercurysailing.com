'use client';

import type { Theme } from 'types/theme';
import { ListOfLinks } from '../../common/ListOfLinks/ListOfLinks';
import { ShowIf } from '../../common/ShowIf/ShowIf';
import s from './s.module.css';
import { ListIcon } from '../../common/ListIcon/ListIcon';
import { useMemo, useState } from 'react';
import { getHeaderColor, getTextColor } from 'types/theme';
import Image from 'next/image';




export type ListFeedbackItemProps = {
  name: string;
  role: string;
  text: string;
  image: string;
  theme?: Theme;
};




export const ListFeedbackItem = ({ name, role, text, image, theme = 'white' }: ListFeedbackItemProps) => {

  let colorText = useMemo(() => getTextColor(theme), [theme]);
  let colorHeader = useMemo(() => getHeaderColor(theme), [theme]);

  return <div className={ s.container }>
    <ShowIf condition={ text !== undefined }>
      <p className={ s.text } style={ { color: colorText } }>
        &laquo;{ text }&raquo;
      </p>
    </ShowIf>
    <ShowIf condition={ image !== undefined }>
      <div className={ s.image }>
        <Image src={ image } className={ s.image } width={ 100 } height={ 100 } alt={ name } />
      </div>
    </ShowIf>
    <div>
      <ShowIf condition={ !!name }>
        <h2
          className={ s.name }
          style={ { color: colorHeader } }>
          { name }
        </h2>
      </ShowIf>
      <ShowIf condition={ role !== undefined }>
        <p className={ s.job }>{ role }</p>
      </ShowIf>
    </div>
  </div>;
};


{/* <Stack ta='center' px='xl' align='center'>
<Image src={ item.image } w='100px' style={ { borderRadius: '50px' } } h='auto' />
<Text fz='xxl' lh={ 1.2 } style={ { fontStyle: 'italic' } }>&laquo;{ item.text }&raquo;</Text>
<Text lh={ 1.2 } c='var(--text-color-body)' fz='sm'>{ item.name }<br />{ item.description }</Text>
</Stack> */}