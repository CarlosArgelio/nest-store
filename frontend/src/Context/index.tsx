import { createContext, useState } from 'react';
import { ProductsGet } from '../types/Products';

export const ShoppingCartContext = createContext({} as any);

export const ShoppingCartProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  // Count Shopping cart
  const [count, setCount] = useState<number>(0);

  // Product Detail - Open & Close
  const [isProductDetailOpen, setIsProductDetailOpen] =
    useState<boolean>(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  // Product Detail - Show Product
  const [productDetail, setproductDetail] = useState<ProductsGet | object>({});

  // Shopping Cart - Add products to cart
  const [cartProduct, setCartProduct] = useState<ProductsGet[] | []>([]);

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        isProductDetailOpen,
        openProductDetail,
        closeProductDetail,
        productDetail,
        setproductDetail,
        cartProduct,
        setCartProduct,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
