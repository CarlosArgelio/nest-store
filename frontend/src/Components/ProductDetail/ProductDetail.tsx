import { useContext } from 'react';
import { Xsvg } from './../../Common';
import { ShoppingCartContext } from './../../Context';

export const ProductDetail = () => {
  const context = useContext(ShoppingCartContext);

  const { closeProductDetail, isProductDetailOpen } = context;

  return (
    <aside
      className={`${isProductDetailOpen ? 'block' : 'hidden'} flex flex-col fixed right-0 border border-black bg-white rounded-lg h-[calc(100vh-80px)] w-[360px] top-[68px]`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Detail</h2>
        <div onClick={closeProductDetail}>
          <Xsvg className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </aside>
  );
};
