import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

// PartialType is a utility type that allows you to create a new type that is a copy of another type but with all of its properties set to optional.
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
