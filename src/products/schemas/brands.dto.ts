import { BrandModel } from 'src/products/models/brands.entity';
import { OmitType, PartialType } from '@nestjs/swagger';

export class BrandDto extends BrandModel {}
export class CreateBrandDto extends OmitType(BrandDto, ['brandId']) {}
export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
