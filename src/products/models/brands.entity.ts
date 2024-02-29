import { Column, Entity } from 'typeorm';

import { BaseClassModel } from 'src/base.model';

@Entity({ name: 'brands' })
export class BrandModel extends BaseClassModel {
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  name: string;
}
