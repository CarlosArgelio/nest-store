import { Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseClassModel } from 'src/base.model';

import { CustomerModel } from './customers.entity';
import { OrderItemModel } from './order-item.entity';

@Entity({ name: 'orders' })
export class OrderModel extends BaseClassModel {
  @ManyToOne(() => CustomerModel, (customer) => customer.orders)
  customer: CustomerModel;

  @OneToMany(() => OrderItemModel, (item) => item.order)
  items: OrderItemModel[];
}
