import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Layout, OrderCard } from '../../Components';
import { ShoppingCartContext } from './../../Context';

function MyOrder() {
  const context = useContext(ShoppingCartContext);
  const { order } = context;

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-80 mb-6">
        <Link to={`/my-orders`} className="absolute left-0">
          <ChevronLeftIcon className="h-7 w-7 text-black hover:text-red-600" />
        </Link>
        <h1>My Orders</h1>
      </div>
      <div className="flex flex-col w-80">
        {order
          ?.slice(-1)[0]
          .products.map((product: any) => (
            <OrderCard
              key={product.id}
              id={product.id}
              image={product.image}
              price={product.price}
              title={product.title}
            />
          ))}
      </div>
    </Layout>
  );
}
export { MyOrder };
