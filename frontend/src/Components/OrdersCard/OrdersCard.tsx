import { OrdersCardProps } from '../../types/Card';

export const OrdersCard = (props: OrdersCardProps) => {
  const { totalPrice, totalProducts } = props;

  return (
    <div className="flex justify-between items-center mb-2 border border-black">
      <p>
        <span>01.02.23</span>
        <span>{totalProducts}</span>
        <span>{totalPrice}</span>
      </p>
    </div>
  );
};
