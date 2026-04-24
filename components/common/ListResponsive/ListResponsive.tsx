import { Fragment } from 'react/jsx-runtime';
import { ListItem } from 'components/common/ListResponsive/ListItem/ListItem';
import { For } from '../For/For';
import s from './s.module.css';
import type { ListItemProps } from 'types/list';




export type ListResponsiveProps = {
  items: ListItemProps[];
  vertical?: boolean;
  startIndex?: number;
}




export default function ListResponsive({ items, vertical = false, startIndex = 1 }: ListResponsiveProps) {

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
            // links={ item.links }
            theme="light"
          />
        </Fragment>
      ) } />
    </div>
  );
}