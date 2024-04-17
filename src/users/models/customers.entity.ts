import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { BaseClassModel } from 'src/base.model';

import { OrderModel } from './orders.entity';
import { UserModel } from './users.entity';

@Entity({ name: 'customers' })
export class CustomerModel extends BaseClassModel {
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  phone: string;

  @OneToOne(() => UserModel, (user) => user.customer, { nullable: false })
  user: UserModel;

  @OneToMany(() => OrderModel, (order) => order.customer)
  orders: OrderModel[];
}
