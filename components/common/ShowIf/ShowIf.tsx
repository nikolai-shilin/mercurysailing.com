type ShowIfProps = {
  condition: boolean;
  children: React.ReactNode;
};

export const ShowIf = ({ condition, children }: ShowIfProps) => {
  return condition ? children : null;
};
