import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

import { BaseClassModel } from 'src/base.model';

@Entity()
export class ProductModel extends BaseClassModel {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'varchar',
  })
  image: string;

  @Column({
    type: 'int',
  })
  stock: number;

  // @Column({
  //   type: 'varchar',
  // })
  // categoryId: string;
}
