import { OmitType, PartialType } from '@nestjs/swagger';
import { IsString, Max } from 'class-validator';

import { BrandModel } from 'src/products/models/brands.entity';

export class BrandDto extends BrandModel {
  @IsString()
  @Max(255)
  readonly name: string;
}
export class CreateBrandDto extends OmitType(BrandDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
