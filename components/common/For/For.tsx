type ForProps = {
  list: any[];
  itemFn: (item: any, index: number) => React.ReactNode;
};




export const For = ({ list = [], itemFn }: ForProps) => {
  return <>{ list.map((item, index) => itemFn(item, index)) }</>;
};

