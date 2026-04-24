import { Fragment } from 'react/jsx-runtime';
import { ListItem } from 'components/common/ListResponsiveLinked/ListItemLinked/ListItemLinked';
import { For } from '../For/For';
import s from './s.module.css';
import type { ListItemProps } from 'types/list';
import type { Theme } from 'types/theme';




export type ListResponsiveLinkedProps = {
  items: ListItemProps[];
  vertical?: boolean;
  theme?: Theme;
  startIndex?: number;
}




export default function ListResponsiveLinked({ items, vertical = false, theme = 'light', startIndex = 1 }: ListResponsiveLinkedProps) {

  const className = vertical ? s.containerVertical : s.container;

  return (
    <div className={ className }>
      <For list={ items } itemFn={ (item, index) => (
        <Fragment key={ index }>
          <ListItem
            key={ index }
            // subtitle={ item.subtitle }
            title={ item.title }
            index={ index + startIndex }
            // short={ item.short }
            long={ item.long ?? item.short }
            links={ item.links }
            theme={ theme }
          />
        </Fragment>
      ) } />
    </div>
  );
}