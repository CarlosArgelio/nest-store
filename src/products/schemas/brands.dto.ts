import { OmitType, PartialType } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

import { BaseClassDto } from 'src/base.model';

// import { ProductDto } from './products.dto';

export class BrandDto extends BaseClassDto {
  @IsString()
  readonly name: string;

  @IsUrl()
  readonly image: string;

  readonly products: any;
}
export class CreateBrandDto extends OmitType(BrandDto, [
  'id',
  'createdAt',
  'updatedAt',
  'products',
]) {}
export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
