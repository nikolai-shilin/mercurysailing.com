import s from './s.module.css';



export type TableProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Table = ({ children, style }: TableProps) => {
  return (
    <table className={ s.table } style={ style }>
      { children }
    </table>
  )
}




export type TheadProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Thead= ({ children, style }: TheadProps) => {
  return (
    <thead className={ s.thead } style={ style }>
      { children }
    </thead>
  )
}




export type TbodyProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Tbody = ({ children, style }: TbodyProps) => {
  return (
    <tbody className={ s.tbody } style={ style }>
      { children }
    </tbody>
  )
}




export type TrProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Tr = ({ children, style }: TrProps) => {
  return (
    <tr className={ s.tr } style={ style }>
      { children }
    </tr>
  )
}




export type ThProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Th = ({ children, style }: ThProps) => {
  return (
    <th className={ s.th } style={ style }>
      { children }
    </th>
  )
}




export type TdProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Td = ({ children, style }: TdProps) => {
  return (
    <td className={ s.td }>
      { children }
    </td>
  )
}



export type StackProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Stack = ({ children, style }: StackProps) => {
  return (
    <div className={ s.stack } style={ style }>
      { children }
    </div>
  )
}

