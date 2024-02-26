import { BrandModel } from 'src/models/brands.model';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class BrandDto extends BrandModel {}
export class CreateBrandDto extends OmitType(BrandDto, ['brandId']) {}
export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
