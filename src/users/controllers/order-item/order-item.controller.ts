import { Body, Controller, Post } from '@nestjs/common';

import { CreateOrderItemDto } from 'src/users/schemas/order-item.dto';
import { OrderItemService } from 'src/users/services/order-item/order-item.service';

@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}
  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.orderItemService.create(payload);
  }
}
