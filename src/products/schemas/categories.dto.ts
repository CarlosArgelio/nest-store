import { OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

import { CategoryModel } from 'src/products/models/categories.entity';

export class CategoryDto extends CategoryModel {}
export class CreateCategoryDto extends OmitType(CategoryModel, [
  'categoryId',
  'createdAt',
  'updatedAt',
]) {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}
export class UpdateCategoryDto extends PartialType(
  OmitType(CategoryModel, ['categoryId', 'createdAt', 'updatedAt']),
) {}
