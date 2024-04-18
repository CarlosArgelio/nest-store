import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomerModel } from 'src/users/models/customers.entity';
import { OrderModel } from 'src/users/models/orders.entity';
import { CreateOrderDto, UpdateOrderDto } from 'src/users/schemas/orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderModel) private orderRepo: Repository<OrderModel>,
    @InjectRepository(CustomerModel)
    private customerRepo: Repository<CustomerModel>,
  ) {}

  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: string) {
    const order = await this.orderRepo.findOne(id, {
      relations: ['items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException('not found');
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new OrderModel();
    if (data.customerId) {
      const customer = await this.customerRepo.findOne(data.customerId);
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async update(id: string, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOne(id);
    if (changes.customerId) {
      const customer = await this.customerRepo.findOne(changes.customerId);
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  remove(id: string) {
    return this.orderRepo.delete(id);
  }
}
