import { createContext, useEffect, useState } from 'react';
import { ProductsGet, Order } from '../types/Products';

import { config } from './../../configuration';

const { apiUrl } = config;

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
  products: ProductsGet[] | null;
  setProducts: React.Dispatch<React.SetStateAction<ProductsGet[] | null>>;
  searchByTitle: string | null;
  setSearchByTitle: React.Dispatch<React.SetStateAction<string | null>>;
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

  // Get product
  const [products, setProducts] = useState<ProductsGet[] | null>(null);

  // Get product by title
  const [searchByTitle, setSearchByTitle] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${apiUrl}/api/v1/products`)
      .then((response) => response.json())
      .then((products) => setProducts(products))
      .catch((error) => console.log(error));
  }, []);

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
        products,
        setProducts,
        searchByTitle,
        setSearchByTitle,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
