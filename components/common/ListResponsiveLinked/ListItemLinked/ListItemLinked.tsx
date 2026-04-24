import { ListOfLinks } from '../../ListOfLinks/ListOfLinks';
import { ShowIf } from '../../ShowIf/ShowIf';
import s from './s.module.css';
import { ListIcon } from '../../ListIcon/ListIcon';
import type { ListItemProps } from 'types/list';




export const ListItem = ({ title, index, short, long, links, theme = 'white', subtitle }: ListItemProps) => {

  let color = 'var(--color-black)';
  switch (theme) {
    case 'black':
      color = 'var(--color-white)';
      break;
    case 'dark':
      color = 'var(--color-white)';
      break;
    case 'light':
      color = 'var(--color-black)';
      break;
  }

  return <div className={ s.container }>
    <ShowIf condition={ index !== undefined }>
      <div className={ s.index }>
        <ListIcon index={ index || 0 } color={ color } />
      </div>
    </ShowIf>
    <ShowIf condition={ title !== undefined }>
      <h2
        className={ s.title }
        style={ { color } }
        dangerouslySetInnerHTML={ { __html: title } }
      />
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