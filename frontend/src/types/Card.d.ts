import { ProductsGet } from './Products';

export interface OrderCardProps
  extends Omit<Products, 'category' | 'description' | 'images'> {
  readonly id: number;
  readonly image: string;
  readonly price: number;
  readonly title: string;
  handleDelete(id: number): void;
}
