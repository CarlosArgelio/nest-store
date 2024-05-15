import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { OrdersCardProps } from '../../types/Card';

export const OrdersCard = (props: OrdersCardProps) => {
  const { totalPrice, totalProducts } = props;

  return (
    <div className="flex justify-between items-center mb-4 border border-black p-4 w-80 rounded-lg">
      <div className="flex justify-between w-full">
        <p className="flex flex-col font-light">
          <span>01.02.23</span>
          <span>{totalProducts} Articles</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium text-2xl">${totalPrice}</span>
          <ChevronRightIcon className="h-6 w-6 text-black cursor-pointer" />
        </p>
      </div>
    </div>
  );
};
