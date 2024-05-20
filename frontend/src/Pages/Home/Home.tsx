import { useContext } from 'react';
import { ShoppingCartContext } from './../../Context';
import { Layout, Card, ProductDetail } from './../../Components';

function Home() {
  const context = useContext(ShoppingCartContext);

  const { products, searchByTitle, setSearchByTitle, filteredProducts } =
    context;

  const renderView = () => {
    if (searchByTitle && searchByTitle.length > 0) {
      if (filteredProducts && filteredProducts?.length > 0) {
        return filteredProducts?.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            category={product.category.name}
            price={product.price}
            title={product.title}
            image={product.images[0]}
            description={product.description}
          />
        ));
      } else {
        return <div>We don't have anything</div>;
      }
    } else {
      if (products) {
        return products.map((product) => (
          <Card
            key={product.id}
            id={product.id}
            category={product.category.name}
            price={product.price}
            title={product.title}
            image={product.images[0]}
            description={product.description}
          />
        ));
      }
    }
  };

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
          {renderView()}
        </div>
        <ProductDetail />
      </Layout>
    </>
  );
}

export { Home };
