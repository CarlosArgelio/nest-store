import { OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

import { BaseClassDto } from 'src/base.model';

export class CategoryDto extends BaseClassDto {
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
  OmitType(CategoryDto, ['id', 'createdAt', 'updatedAt']),
) {}
