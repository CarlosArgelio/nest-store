import { OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

import { CategoryModel } from 'src/products/models/categories.entity';

export class CategoryDto extends CategoryModel {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}
export class CreateCategoryDto extends OmitType(CategoryDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
export class UpdateCategoryDto extends PartialType(
  OmitType(CategoryModel, ['id', 'createdAt', 'updatedAt']),
) {}
