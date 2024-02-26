import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderDto } from 'src/dtos/orders.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  private orders: OrderDto[] = [];
  constructor() {
    for (let i = 0; i < 5; i++) {
      this.orders.push({
        orderId: faker.datatype.uuid(),
        products: [
          {
            productId: faker.datatype.uuid(),
            amount: faker.datatype.number(),
          },
        ],
        customerId: faker.datatype.uuid(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      });
    }
  }

  // findAll(): IOrder[] {
  //   return this.orders;
  // }

  findOne(orderId: OrderDto['orderId']): OrderDto {
    const index = this.orders.findIndex((o) => o.orderId === orderId);
    const response = this.orders[index];
    return response;
  }

  create(order: CreateOrderDto): OrderDto {
    const orderId = uuidv4();
    const customerId = uuidv4();
    const newOrder = {
      ...order,
      orderId,
      customerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.add(newOrder);
    return newOrder;
  }

  add(order: OrderDto): void {
    this.orders.push(order);
  }
}
