import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

import { BaseClassModel } from 'src/base.model';

@Entity()
export class BrandModel extends BaseClassModel {
  @PrimaryGeneratedColumn('uuid')
  brandId: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string;
}
