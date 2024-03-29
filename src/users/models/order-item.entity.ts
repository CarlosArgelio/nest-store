import { Entity, Column, ManyToOne } from 'typeorm';

import { BaseClassModel } from 'src/base.model';
import { ProductModel } from 'src/products/models/products.entity';
import { OrderModel } from './orders.entity';

@Entity({ name: 'order_item' })
export class OrderItemModel extends BaseClassModel {
  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => ProductModel)
  product: ProductModel;

  @ManyToOne(() => OrderModel, (order) => order.items)
  order: OrderModel;
}
