import s from './s.module.css';

export const ShowFromSm = ({ children }: { children: React.ReactNode }) => {
  return <div className={s.container}>
      {children}
  </div>;
};
