import { OmitType, PartialType } from '@nestjs/swagger';

import { BrandModel } from 'src/products/models/brands.entity';

export class BrandDto extends BrandModel {}
export class CreateBrandDto extends OmitType(BrandDto, ['brandId']) {}
export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
