import { PickType } from '@nestjs/mapped-types';
import { BaseClassModel } from 'src/base.model';
import { ProductDto } from 'src/products/schemas/products.dtos';

export class ProductItemModel extends PickType(ProductDto, ['productId']) {
  amount: number;
}

export class OrderModel extends BaseClassModel {
  orderId: string;
  customerId: string;
  products: ProductItemModel[];
}
