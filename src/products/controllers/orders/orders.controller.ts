import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ResponseModel } from 'src/base.model';
import { CreateOrderDto, OrderDto } from 'src/products/schemas/orders.dto';
import { OrdersService } from 'src/products/services/orders/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersServices: OrdersService) {}
  @Get('/:orderId')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('orderId', ParseUUIDPipe) orderId: OrderDto['orderId'],
  ): ResponseModel<OrderDto> {
    const response = this.ordersServices.findOne(orderId);
    return {
      statusCode: HttpStatus.OK,
      data: response,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createOrder(@Body() payload: CreateOrderDto): ResponseModel<OrderDto> {
    const newOrder = this.ordersServices.create(payload);

    return {
      statusCode: HttpStatus.CREATED,
      data: newOrder,
    };
  }
}
