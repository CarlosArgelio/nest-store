import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { FilterDto } from 'src/base.dto';
import { ResponseModel } from 'src/base.model';
import {
  CreateOrderItemDto,
  OrderItemDto,
  UpdateOrderItemDto,
} from 'src/users/schemas/order-item.dto';
import { OrderItemService } from 'src/users/services/order-item/order-item.service';

@ApiTags('orders')
@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    required: false,
  })
  async findAll(@Param() params: FilterDto): Promise<ResponseModel<any>> {
    const OrdersItem = await this.orderItemService.findAll(params);

    return { statusCode: HttpStatus.OK, data: OrdersItem };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateOrderItemDto,
  ): Promise<ResponseModel<any>> {
    const newOrderItem = await this.orderItemService.create(payload);
    return { statusCode: HttpStatus.OK, data: newOrderItem };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: OrderItemDto['id'],
    @Body() changes: UpdateOrderItemDto,
  ): Promise<ResponseModel<any>> {
    const updateOrderItem = await this.orderItemService.update(id, changes);
    return { statusCode: HttpStatus.OK, data: updateOrderItem };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
  })
  delete(@Param('id', ParseUUIDPipe) id: OrderItemDto['id']) {
    return this.orderItemService.delete(id);
  }
}
