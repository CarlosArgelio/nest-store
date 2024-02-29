import { OmitType, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { BrandModel } from 'src/products/models/brands.entity';

export class BrandDto extends BrandModel {
  @IsString()
  name: string;

  createdAt: Date;
  updatedAt?: Date;
}
export class CreateBrandDto extends OmitType(BrandDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {}
export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
