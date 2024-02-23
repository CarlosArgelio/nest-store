import { Body, Controller, Post } from '@nestjs/common';
import { Order } from './orders.model';

@Controller('orders')
export class OrdersController {
  @Post()
  createOrder(@Body() payload: Order) {
    return payload;
  }
}
