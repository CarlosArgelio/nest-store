import { Column, Entity } from 'typeorm';

import { BaseClassModel } from 'src/base.model';

@Entity({ name: 'products' })
export class ProductModel extends BaseClassModel {
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'text', unique: true, nullable: false })
  image: string;

  @Column({ type: 'int', nullable: false })
  stock: number;

  // @Column({
  //   type: 'varchar',
  // })
  // categoryId: string;
}
