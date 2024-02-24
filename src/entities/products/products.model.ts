import { BaseModel } from 'src/base.model';
import { Category } from '../categories/categories.model';

export interface Product extends BaseModel {
  productId: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  categoryId: Category['categoryId'];
}
