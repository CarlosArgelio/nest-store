import { OmitType } from '@nestjs/mapped-types';
import { OrderModel } from 'src/users/models/orders.model';
// import { OmitType } from '@nestjs/mapped-types';

export class OrderDto extends OmitType(OrderModel, ['createdAt']) {}
// export class CreateOrderDto extends OmitType(OrderDto, ['customerId']) {}
