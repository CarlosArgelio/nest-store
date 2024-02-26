import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { CategoryModel } from 'src/models/categories.model';

export class CategoryDto extends CategoryModel {}
export class CreateCategoryDto extends OmitType(CategoryModel, ['categoryId']) {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsArray()
  @IsNotEmpty()
  readonly image: string[];
}
export class UpdateCategoryDto extends PartialType(CategoryDto) {}
