import { OmitType, PartialType } from '@nestjs/swagger';
import { IsString, Max } from 'class-validator';

import { BaseClassDto } from 'src/base.model';

export class BrandDto extends BaseClassDto {
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
