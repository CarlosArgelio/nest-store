import { OrderModel } from 'src/products/models/orders.model';
import { OmitType } from '@nestjs/mapped-types';

export class OrderDto extends OrderModel {}
export class CreateOrderDto extends OmitType(OrderDto, ['customerId']) {}
