import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseClassModel } from 'src/base.model';

import { CustomerModel } from './customers.entity';

export enum ROLE {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Entity({ name: 'users' })
export class UserModel extends BaseClassModel {
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string; // encript

  @Column({ type: 'enum', enum: ROLE })
  role: ROLE;

  @OneToOne(() => CustomerModel, (customer) => customer.user, {
    nullable: true,
  })
  @JoinColumn()
  customer: CustomerModel;
}
