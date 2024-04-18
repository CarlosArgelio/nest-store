import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderItemModel } from 'src/users/models/order-item.entity';
import { OrderModel } from 'src/users/models/orders.entity';

import { ProductModel } from './../../../products/models/products.entity';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from './../../schemas/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderModel)
    private orderRepo: Repository<OrderModel>,

    @InjectRepository(OrderItemModel)
    private orderItemRepo: Repository<OrderItemModel>,

    @InjectRepository(ProductModel)
    private productRepo: Repository<ProductModel>,
  ) {}

  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne(data.orderId);
    const product = await this.productRepo.findOne(data.productId);

    const item = new OrderItemModel();
    item.order = order;
    item.product = product;
    item.quantity = data.quantity;

    return this.orderItemRepo.save(item);
  }
}
