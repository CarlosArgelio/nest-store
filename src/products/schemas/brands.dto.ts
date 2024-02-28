import { OmitType, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { BrandModel } from 'src/products/models/brands.entity';

export class BrandDto implements BrandModel {
  brandId: string;

  @IsString()
  name: string;

  createdAt: Date;
  updatedAt?: Date;
}
export class CreateBrandDto extends OmitType(BrandDto, [
  'brandId',
  'createdAt',
  'updatedAt',
]) {}
export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
