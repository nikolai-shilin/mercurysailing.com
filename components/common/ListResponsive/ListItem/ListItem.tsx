import { ListOfLinks } from '../../ListOfLinks/ListOfLinks';
import { ShowIf } from '../../ShowIf/ShowIf';
import s from './s.module.css';
import { ListIcon } from '../../ListIcon/ListIcon';
import type { Theme } from 'types/theme';
import { getHeaderColor, getTextColor } from 'types/theme';


export type ListItemProps = {
  title: string;
  index?: number;
  short?: string;
  long?: string;
  links?: { label: string; to: string }[];
  theme?: Theme;
  subtitle?: string;
};

export const ListItem = ({ title, index, short, long, links, theme = 'white', subtitle }: ListItemProps) => {
  let headerColor = getHeaderColor(theme);
  let textColor = getTextColor(theme);

  return <div className={ s.container }>
    <ShowIf condition={ index !== undefined }>
      <div className={ s.index }>
        <ListIcon index={ index || 0 } color={ headerColor } />
      </div>
    </ShowIf>
    <ShowIf condition={ title !== undefined }>
      <h2
        className={ s.title }
        style={ { color: headerColor } }>
        <ShowIf condition={ subtitle !== undefined }>
          <span className={ s.subtitle }>{ subtitle }</span>
          { ' ' }
        </ShowIf>
        { title }
      </h2>
    </ShowIf>
    <ShowIf condition={ short !== undefined }>
      <p className={ s.short } style={ { color: textColor } } dangerouslySetInnerHTML={ { __html: short || '' } } />
    </ShowIf>
    <ShowIf condition={ long !== undefined }>
      <p className={ s.long } dangerouslySetInnerHTML={ { __html: long || '' } } />
    </ShowIf>
    <ShowIf condition={ links !== undefined }>
      <div className={ s.links }>
        <ListOfLinks items={ links as unknown as { label: string; to: string }[] } inline={ true } />
      </div>
    </ShowIf>
  </div>;
};