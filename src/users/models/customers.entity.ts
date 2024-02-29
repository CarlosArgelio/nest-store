import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BaseClassModel } from 'src/base.model';

import { UserModel } from './users.entity';

@Entity()
export class CustomerModel extends BaseClassModel {
  @PrimaryGeneratedColumn('uuid')
  customerId: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  phone: string;

  @OneToOne(() => UserModel, (user) => user.customer, { nullable: false })
  user: UserModel;
}
