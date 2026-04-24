import Link from 'next/link';
import { For } from '../For/For';
import s from './s.module.css';




type ListOfLinksProps = {
  items: { label: string, to: string }[];
  inline?: boolean;
};




export const ListOfLinks = ({ items, inline = false }: ListOfLinksProps) => {

  const className = inline ? s.inline : s.list;

  return <ul className={ className }>
    <For list={ items } itemFn={ (item, index) => (
      <li key={ 'list-item-' + index } className={ s.item }>
        <Link href={ item.to ?? '' }>
          { item.label }
        </Link>
        {/* { ' →' } */ }
      </li>
    ) } />
  </ul>;
};
