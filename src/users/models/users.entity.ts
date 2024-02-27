import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseClassModel } from 'src/base.model';

export enum ROLE {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Entity()
export class UserModel extends BaseClassModel {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    type: 'text',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: ROLE,
  })
  role: ROLE;
}
