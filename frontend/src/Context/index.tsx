import { createContext, useState } from 'react';

export const ShoppingCartContext = createContext({} as any);

export const ShoppingCartProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [count, setCount] = useState<number>(0);
  const [isProductDetailOpen, setIsProductDetailOpen] =
    useState<boolean>(false);

  const openProductDetail = () => {
    setIsProductDetailOpen(true);
  };

  const closeProductDetail = () => {
    setIsProductDetailOpen(false);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        isProductDetailOpen,
        openProductDetail,
        closeProductDetail,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
