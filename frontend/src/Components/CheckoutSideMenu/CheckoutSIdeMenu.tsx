import { useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from './../../Context';

export const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext);

  const { closeCheckoutSideMenu, isCheckoutSideMenuOpen } = context;

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
    </aside>
  );
};
