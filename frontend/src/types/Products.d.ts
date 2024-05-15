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

export interface Order {
  date: string;
  id: number;
  products: ProductsGet[];
  totalProducts: number;
  totalPrice: number;
}
