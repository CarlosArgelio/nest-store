import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

import { BaseClassDto } from 'src/base.model';

import { BrandDto } from './brands.dto';
// import { CreateProduct } from 'src/entities/products/products.dtos';

export class ProductDto extends BaseClassDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  readonly price: number;

  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @IsNotEmpty()
  @IsUUID('4')
  @ApiProperty()
  readonly brandId: BrandDto['id'];

  // @IsUUID('4')
  // @IsNotEmpty()
  // readonly categoryId: string;
}

export class CreateProductDto extends OmitType(ProductDto, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
