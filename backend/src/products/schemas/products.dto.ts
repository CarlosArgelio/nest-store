import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  IsUrl,
  Min,
  ValidateIf,
} from 'class-validator';

import { FilterDto } from 'src/base.dto';
import { BaseClassDto } from 'src/base.model';

import { BrandDto } from './brands.dto';
import { CategoryDto } from './categories.dto';

export class ProductDto extends BaseClassDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  readonly price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  readonly brandId: BrandDto['id'];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  readonly categoriesIds: CategoryDto['id'][];
}

export class CreateProductDto extends OmitType(ProductDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto extends FilterDto {
  @IsOptional()
  @IsOptional()
  minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsOptional()
  @IsOptional()
  maxPrice: number;
}
