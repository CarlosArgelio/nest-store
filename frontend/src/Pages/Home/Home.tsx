import { useEffect, useState } from 'react';
import { Layout, Card, ProductDetail } from './../../Components';

import { config } from './../../../configuration';
import { ProductsGet } from '../../types/Products';

const { apiUrl } = config;

function Home() {
  const [products, setProducts] = useState<ProductsGet[] | null>(null);

  useEffect(() => {
    fetch(`${apiUrl}/api/v1/products`)
      .then((response) => response.json())
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => console.log('finally'));
  }, []);

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Layout>
        Home
        <div className="grid gap-3 grid-cols-4 w-full max-w-screen-lg">
          {products.map((product) => (
            <Card
              key={product.id}
              category={product.category.name}
              price={product.price}
              title={product.title}
              image={product.images[0]}
              description={product.description}
            />
          ))}
        </div>
        <ProductDetail />
      </Layout>
    </>
  );
}

export { Home };
