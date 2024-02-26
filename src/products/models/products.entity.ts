import { BaseClassModel } from 'src/base.model';

export class ProductModel extends BaseClassModel {
  productId: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  stock: number;
  categoryId: string;
}
