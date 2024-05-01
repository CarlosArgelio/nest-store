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
