import s from './s.module.css';

export const ShowToSm = ({ children }: { children: React.ReactNode }) => {
  return <div className={s.container}>
      {children}
  </div>;
};
