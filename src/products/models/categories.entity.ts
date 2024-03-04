import { Column, Entity } from 'typeorm';

import { BaseClassModel } from 'src/base.model';

@Entity({ name: 'categories' })
export class CategoryModel extends BaseClassModel {
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', unique: true, nullable: true })
  image: string;
}
