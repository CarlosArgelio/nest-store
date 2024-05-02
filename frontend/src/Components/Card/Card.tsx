import React from 'react';
import { useContext } from 'react';
import { ShoppingCartContext } from './../../Context';
import { PlusIcon } from '@heroicons/react/24/solid';

export interface CardProps {
  category: string;
  price: number;
  title: string;
  image: string;
  description: string;
}

export const Card = ({
  category,
  price,
  title,
  image,
  description,
}: CardProps) => {
  const context = useContext(ShoppingCartContext);
  const {
    count,
    setCount,
    openProductDetail,
    closeProductDetail,
    setproductDetail,
    cartProduct,
    setCartProduct,
    openCheckoutSideMenu,
  } = context;

  const data = { category, price, title, image, description };

  const detailProduct = (productDetail: CardProps) => {
    openProductDetail();
    setproductDetail(productDetail);
  };

  const addProductsToCart = (
    e: React.MouseEvent<HTMLDivElement>,
    productData: CardProps,
  ) => {
    e.stopPropagation();

    setCount(count + 1);
    setCartProduct([...cartProduct, productData]);
    closeProductDetail();
    openCheckoutSideMenu();

    console.log('CARTS => ', cartProduct);
  };

  return (
    <React.Fragment>
      <div
        className="bg-white cursor-pointer w-56 h-60 rounded-lg"
        onClick={() => detailProduct(data)}
      >
        <figure className="relative mb-2 w-full h-4/5">
          <span className="absolute bottom-0.5 left-1 bg-white/60 rounded-lg text-black text-xs px-3 py-0.5">
            {category}
          </span>
          <img
            className="w-full h-full object-cover rounded-lg"
            src={image}
            alt="headphones"
          />
          <div
            className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
            onClick={(e) => addProductsToCart(e, data)}
          >
            <PlusIcon className="h-7 w-7 text-black" />
          </div>
        </figure>
        <p className="flex justify-between">
          <span className="text-sm font-light">{title}</span>
          <span className="text-lg font-medium">${price}</span>
        </p>
      </div>
    </React.Fragment>
  );
};
