import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseClassModel } from 'src/base.model';

export enum ROLE {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

@Entity()
export class UserModel implements BaseClassModel {
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

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  updatedAt?: Date;
}
