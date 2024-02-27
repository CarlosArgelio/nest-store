import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseClassModel } from 'src/base.model';

@Entity()
export class CategoryModel implements BaseClassModel {
  @PrimaryGeneratedColumn('uuid')
  categoryId: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  image: string;

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
