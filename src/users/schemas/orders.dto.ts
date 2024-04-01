import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { BaseClassDto } from 'src/base.model';
import { ProductModel } from 'src/products/models/products.entity';

export class OrderDto extends BaseClassDto {
  @ApiProperty()
  @IsUUID('4')
  @IsNotEmpty()
  readonly customerId: string;
}

export class GetOrders extends OmitType(OrderDto, [
  'id',
  'createdAt',
  'updatedAt',
  'customerId',
]) {
  readonly date: Date;
  readonly users: any;
  readonly products: ProductModel[];
}
export class CreateOrderDto extends PickType(OrderDto, ['customerId']) {}
export class UpdateOrderDto extends PickType(OrderDto, ['customerId']) {}
