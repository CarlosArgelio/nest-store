import { BaseModel } from 'src/base.model';
import { Products } from '../products/products.dtos';

export interface ProductItem extends Pick<Products, 'productId'> {
  amount: number;
}

export interface Order extends BaseModel {
  orderId: string;
  customerId: string;
  products: ProductItem[];
}
