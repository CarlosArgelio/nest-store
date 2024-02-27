import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

import { BaseClassModel } from 'src/base.model';

@Entity()
export class CostumerModel extends BaseClassModel {
  @PrimaryGeneratedColumn('uuid')
  customerId: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  phone: string;
}
