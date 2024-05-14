import { useContext } from 'react';
import { Layout, OrderCard } from '../../Components';
import { ShoppingCartContext } from './../../Context';

function MyOrder() {
  const context = useContext(ShoppingCartContext);
  const { order } = context;

  return (
    <Layout>
      <div className="px-6 overflow-y-scroll flex-1">
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
