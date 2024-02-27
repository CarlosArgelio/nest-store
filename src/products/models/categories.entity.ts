import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { BaseClassModel } from 'src/base.model';

@Entity()
export class CategoryModel extends BaseClassModel {
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
}
