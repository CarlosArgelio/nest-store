import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrderItemModel } from 'src/users/models/order-item.entity';
import { OrderModel } from 'src/users/models/orders.entity';

import { ProductModel } from './../../../products/models/products.entity';
import {
  CreateOrderItemDto,
  OrderItemDto,
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

  async findAll() {
    return await this.orderItemRepo.find();
  }
  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne(data.orderId);
    const product = await this.productRepo.findOne(data.productId);

    const item = new OrderItemModel();
    item.order = order;
    item.product = product;
    item.quantity = data.quantity;

    return this.orderItemRepo.save(item);
  }

  async update(id: OrderItemDto['id'], changes: UpdateOrderItemDto) {
    const orderItem = await this.orderItemRepo.findOne(id);

    try {
      this.orderItemRepo.merge(orderItem, changes);
      const saveOrderItem = await this.orderItemRepo.save(orderItem);
      return saveOrderItem;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: OrderItemDto['id']) {
    return await this.orderItemRepo.delete(id);
  }
}
