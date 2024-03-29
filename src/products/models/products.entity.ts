import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

import { BaseClassModel } from 'src/base.model';

import { BrandModel } from './brands.entity';
import { CategoryModel } from './categories.entity';

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

  @ManyToOne(() => BrandModel, (brand) => brand.products)
  brand: BrandModel;

  @ManyToMany(() => CategoryModel, (category) => category.products)
  @JoinTable()
  categories: CategoryModel[];
}
