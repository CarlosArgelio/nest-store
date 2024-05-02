import { ProductsGet } from './Products';

export interface OrderCardProps
  extends Omit<Products, 'id' | 'category' | 'description' | 'images'> {
  readonly image: string;
  readonly price: number;
  readonly title: string;
}
