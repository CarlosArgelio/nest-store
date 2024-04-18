import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FilterDto } from 'src/base.dto';
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

  findAll(params?: FilterDto) {
    let orders = null;

    try {
      if (params !== undefined) {
        const { limit, offset } = params;
        orders = this.orderRepo.find({
          take: limit,
          skip: offset,
        });
      } else {
        orders = this.orderRepo.find();
      }
    } catch (error) {
      throw new ConflictException(error.message);
    }
    if (orders.length === 0) {
      throw new NotFoundException('not found');
    }

    return orders;
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
