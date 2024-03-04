import { OmitType } from '@nestjs/swagger';

import { BaseClassDto } from 'src/base.model';
import { ProductModel } from 'src/products/models/products.entity';

export class OrderDto extends BaseClassDto {}
export class GetOrders extends OmitType(OrderDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {
  readonly date: Date;
  readonly users: any;
  readonly products: ProductModel[];
}
// export class CreateOrderDto extends OmitType(OrderDto, ['customerId']) {}
