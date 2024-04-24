import { useEffect, useState } from 'react';
import { Layout, Card } from './../../Components';

import { config } from './../../../configuration';

const { apiUrl } = config;

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface ProductsGet {
  id: number;
  title: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
}

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
        {products.map(() => (
          <Card />
        ))}
        <Card />
      </Layout>
    </>
  );
}

export { Home };
