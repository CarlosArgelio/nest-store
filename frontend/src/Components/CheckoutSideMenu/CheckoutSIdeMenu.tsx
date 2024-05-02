import { useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from './../../Context';
// import { ProductsGet } from '../../types/Products';
import { OrderCard } from './../.';
import { totalPrice } from '../../utils';

export const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext);

  const {
    closeCheckoutSideMenu,
    isCheckoutSideMenuOpen,
    cartProduct,
    setCartProduct,
  } = context;

  const handleDelete = (id: number) => {
    const filteredProducts = cartProduct.filter(
      (product: any) => product.id !== id,
    );
    setCartProduct(filteredProducts);
  };

  return (
    <aside
      className={`${isCheckoutSideMenuOpen ? 'flex' : 'hidden'} flex flex-col fixed right-0 border border-black bg-white rounded-lg h-[calc(100vh-80px)] w-[360px] top-[68px]`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <div onClick={closeCheckoutSideMenu}>
          <XMarkIcon
            className="h-7 w-7 text-black hover:text-red-600"
            onClick={closeCheckoutSideMenu}
          />
        </div>
      </div>
      <div className="px-6 overflow-y-scroll">
        {cartProduct.map((product: any) => (
          <OrderCard
            key={product.id}
            id={product.id}
            image={product.image}
            price={product.price}
            title={product.title}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className="px-6">
        <p className="flex items-center justify-between">
          <span className="font-light">Total: </span>
          <span className="font-medium text-2xl">
            ${totalPrice(cartProduct.map((product: any) => product.price))}
          </span>
        </p>
      </div>
    </aside>
  );
};
