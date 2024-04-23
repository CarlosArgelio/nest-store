import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

import { BaseClassModel } from 'src/base.model';

import { BrandModel } from './brands.entity';
import { CategoryModel } from './categories.entity';

@Entity({ name: 'products' })
@Index(['price', 'stock'])
export class ProductModel extends BaseClassModel {
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Index()
  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'text', unique: true, nullable: false })
  image: string;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @ManyToOne(() => BrandModel, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' })
  brand: BrandModel;

  @ManyToMany(() => CategoryModel, (category) => category.products)
  @JoinTable({
    name: 'products_categories',
    joinColumn: {
      name: 'product_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
    },
  })
  categories: CategoryModel[];
}
