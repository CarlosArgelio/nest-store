import { createContext, useState } from 'react';
import { ProductsGet, Order } from '../types/Products';

export interface DefaultValuesShoppingCartContext {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  isProductDetailOpen: boolean;
  openProductDetail(): void;
  closeProductDetail(): void;
  productDetail: {} | ProductsGet;
  setproductDetail: React.Dispatch<React.SetStateAction<{} | ProductsGet>>;
  cartProduct: [] | ProductsGet[];
  setCartProduct: React.Dispatch<React.SetStateAction<[] | ProductsGet[]>>;
  isCheckoutSideMenuOpen: boolean;
  openCheckoutSideMenu(): void;
  closeCheckoutSideMenu(): void;
  order: [] | Order[];
  setOrder: React.Dispatch<React.SetStateAction<[] | Order[]>>;
}

export const ShoppingCartContext = createContext(
  {} as DefaultValuesShoppingCartContext,
);

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

  // Product Detail · Show Product
  const [productDetail, setproductDetail] = useState<ProductsGet | {}>({});

  // Shopping Cart · Add products to cart
  const [cartProduct, setCartProduct] = useState<ProductsGet[] | []>([]);

  // Checkout Side Menu · Open & Close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] =
    useState<boolean>(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  // Shopping Cart · Order
  const [order, setOrder] = useState<Order[] | []>([]);

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
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        setOrder,
        order,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
