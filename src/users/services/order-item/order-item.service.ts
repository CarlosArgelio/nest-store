import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilterDto } from 'src/base.dto';
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

  async findAll(params?: FilterDto) {
    let orderItem = null;

    if (params !== undefined) {
      const { limit, offset } = params;

      orderItem = await this.orderItemRepo.find({
        skip: offset,
        take: limit,
      });
    } else {
      orderItem = await this.orderItemRepo.find();
    }

    if (orderItem.length === 0) {
      throw new NotFoundException('Products not found');
    }
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
