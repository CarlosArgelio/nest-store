import { OmitType } from '@nestjs/swagger';

import { OrderModel } from 'src/users/models/orders.entity';
// import { OmitType } from '@nestjs/swagger';

export class OrderDto extends OmitType(OrderModel, ['createdAt']) {}
// export class CreateOrderDto extends OmitType(OrderDto, ['customerId']) {}
