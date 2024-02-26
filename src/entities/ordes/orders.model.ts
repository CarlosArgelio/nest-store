import { BaseModel } from 'src/base.model';
import { ProductDto } from 'src/dtos/products.dtos';

export interface ProductItem extends Pick<ProductDto, 'productId'> {
  amount: number;
}

export interface Order extends BaseModel {
  orderId: string;
  customerId: string;
  products: ProductItem[];
}
