import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddItemToOrder, CreateOrder, IOrder } from './orders.dtos';
import { ResponseModel } from 'src/base.model';

const responeFake: IOrder[] = [
  {
    orderId: '1',
    productId: '1',
    customerId: '1',
    amount: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Controller('orders')
export class OrdersController {
  @Get('/:orderId')
  findOne(@Param('orderId') orderId: any): ResponseModel<IOrder> {
    const response = {
      ...responeFake[0],
      orderId: orderId,
    };

    return {
      statusCode: 200,
      data: response,
    };
  }

  @Post()
  createOrder(@Body() payload: CreateOrder): ResponseModel<IOrder> {
    const response = {
      ...payload,
      ...responeFake[0],
    };

    return {
      statusCode: 200,
      data: response,
    };
  }

  @Post('/add-item')
  createItem(@Body() payload: AddItemToOrder): ResponseModel<IOrder> {
    const response = {
      ...payload,
      ...responeFake[0],
    };

    return {
      statusCode: 200,
      data: response,
    };
  }
}
