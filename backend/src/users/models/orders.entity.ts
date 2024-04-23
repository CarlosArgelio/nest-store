import { Exclude, Expose } from 'class-transformer';
import { Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseClassModel } from 'src/base.model';

import { CustomerModel } from './customers.entity';
import { OrderItemModel } from './order-item.entity';

@Entity({ name: 'orders' })
export class OrderModel extends BaseClassModel {
  @ManyToOne(() => CustomerModel, (customer) => customer.orders)
  customer: CustomerModel;

  @Exclude()
  @OneToMany(() => OrderItemModel, (item) => item.order)
  items: OrderItemModel[];

  @Expose()
  get products() {
    if (this.items === null) return [];

    return this.items
      .filter((item) => item !== null && item !== undefined)
      .map((item) => ({
        ...item.product,
        quantity: item.quantity,
        itemId: item.id,
      }));
  }

  @Expose()
  get total() {
    if (this.items === null) return 0;

    return this.items
      .filter((item) => item !== null && item !== undefined)
      .reduce((acc, item) => acc + item.quantity * item.product.price, 0);
  }
}
