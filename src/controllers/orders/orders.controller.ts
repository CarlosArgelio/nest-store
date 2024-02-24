import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrder, IOrder, OrderID } from '../../entities/ordes/orders.dtos';
import { ResponseModel } from 'src/base.model';
import { OrdersService } from 'src/services/orders/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersServices: OrdersService) {}
  @Get('/:orderId')
  findOne(
    @Param('orderId') orderId: OrderID['orderId'],
  ): ResponseModel<IOrder> {
    const response = this.ordersServices.findOne(orderId);
    return {
      statusCode: 200,
      data: response,
    };
  }

  @Post()
  createOrder(@Body() payload: CreateOrder): ResponseModel<IOrder> {
    const newOrder = this.ordersServices.create(payload);

    return {
      statusCode: 200,
      data: newOrder,
    };
  }
}
