import { BaseModel } from 'src/base.model';
import { Category } from '../categories/categories.model';

export interface Product extends BaseModel {
  readonly productId: string;
  readonly title: string;
  readonly price: number;
  readonly description: string;
  readonly images: string[];
  readonly stock: number;
  readonly categoryId: Category['categoryId'];
}
