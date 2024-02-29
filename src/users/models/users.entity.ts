import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseClassModel } from 'src/base.model';

import { CustomerModel } from './customers.entity';

export enum ROLE {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Entity()
export class UserModel extends BaseClassModel {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

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
