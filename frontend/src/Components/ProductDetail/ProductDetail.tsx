import { useContext } from 'react';
import { Xsvg } from './../../Common';
import { ShoppingCartContext } from './../../Context';

export const ProductDetail = () => {
  const context = useContext(ShoppingCartContext);

  const { closeProductDetail, isProductDetailOpen, productDetail } = context;
  console.log('🚀 ~ ProductDetail ~ productDetail:', productDetail);

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
      {productDetail && (
        <>
          <figure className="px-6">
            <img
              className="w-full h-full rounded-lg"
              src={productDetail.image}
              alt={productDetail.title}
            />
          </figure>
          <p className="flex flex-col p-6">
            <span className="font-medium text-2xl mb-2">
              $ {productDetail.price}
            </span>
            <span className="font-medium text-2md">{productDetail.title}</span>
            <span className="font-light text-sm">
              {productDetail.description}
            </span>
          </p>
        </>
      )}
    </aside>
  );
};
