import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseClassModel } from 'src/base.model';

@Entity()
export class BrandModel implements BaseClassModel {
  @PrimaryGeneratedColumn('uuid')
  brandId: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string;

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
