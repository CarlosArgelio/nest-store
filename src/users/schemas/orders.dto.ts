import { OmitType } from '@nestjs/swagger';

import { BaseClassDto } from 'src/base.model';
import { ProductDto } from 'src/products/schemas/products.dto';

export class OrderDto extends BaseClassDto {}
export class GetOrders extends OmitType(OrderDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {
  readonly date: Date;
  readonly users: any;
  readonly products: ProductDto[];
}
// export class CreateOrderDto extends OmitType(OrderDto, ['customerId']) {}
