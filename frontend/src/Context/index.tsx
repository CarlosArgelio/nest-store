import { createContext, useState } from 'react';

export const ShoppingCartContext = createContext({} as any);

export const ShoppingCartProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [count, setCount] = useState<number>(0);

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
