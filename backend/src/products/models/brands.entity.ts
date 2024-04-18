import { Column, Entity, OneToMany } from 'typeorm';

import { BaseClassModel } from 'src/base.model';

import { ProductModel } from './products.entity';

@Entity({ name: 'brands' })
export class BrandModel extends BaseClassModel {
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  image: string;

  @OneToMany(() => ProductModel, (product) => product.brand)
  products: ProductModel[];
}
