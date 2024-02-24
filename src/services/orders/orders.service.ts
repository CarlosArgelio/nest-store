import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { CreateOrder, IOrder } from 'src/entities/ordes/orders.dtos';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  private orders: IOrder[] = [];
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

  findOne(orderId: IOrder['orderId']): IOrder {
    const index = this.orders.findIndex((o) => o.orderId === orderId);
    const response = this.orders[index];
    return response;
  }

  // findByUSer(customerId: IOrder['customerId']): IOrder {
  //   const index = this.orders.findIndex((o) => o.customerId === customerId);
  //   const response = this.orders[index];
  //   return response;
  // }

  create(order: CreateOrder): IOrder {
    const orderId = uuidv4();
    const newOrder: IOrder = {
      ...order,
      orderId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.orders.push(newOrder);
    return newOrder;
  }
  // update(orderId: IOrder['orderId'], changes: IOrder): IOrder {
  //   const index = this.orders.findIndex((o) => o.orderId === orderId);
  //   this.orders[index] = {
  //     ...this.orders[index],
  //     ...changes,
  //   };
  //   const response = this.orders[index];
  //   return response;
  // }

  // delete(orderId: IOrder['orderId']): void {
  //   const index = this.orders.findIndex((o) => o.orderId === orderId);
  //   delete this.orders[index];
  //   return;
  // }
}
