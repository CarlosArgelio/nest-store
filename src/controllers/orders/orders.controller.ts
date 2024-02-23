import { Body, Controller, Post } from '@nestjs/common';
import { AddItemToOrder, CreateOrder } from './orders.dtos';

@Controller('orders')
export class OrdersController {
  @Post()
  createOrder(@Body() payload: CreateOrder) {
    return payload;
  }

  @Post('/add-item')
  createItem(@Body() payload: AddItemToOrder) {
    return payload;
  }
}
