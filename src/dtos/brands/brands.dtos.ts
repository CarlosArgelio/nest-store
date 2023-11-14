import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
