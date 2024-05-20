import { useContext } from 'react';
import { ShoppingCartContext } from './../../Context';
import { Layout, Card, ProductDetail } from './../../Components';

function Home() {
  const context = useContext(ShoppingCartContext);

  const { products, searchByTitle, setSearchByTitle } = context;

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Layout>
        <div className="flex items-center justify-center relative w-80 mb-6">
          <h1 className="font-medium text-xl">Exclusive Products</h1>
        </div>
        <input
          type="text"
          placeholder="Search a product"
          className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
          onChange={(e) => setSearchByTitle(e.target.value)}
        />
        <div className="grid gap-3 grid-cols-4 w-full max-w-screen-lg">
          {products.map((product) => (
            <Card
              key={product.id}
              id={product.id}
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
