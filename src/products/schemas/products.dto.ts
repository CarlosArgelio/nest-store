import { OmitType, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

import { ProductModel } from 'src/products/models/products.entity';
// import { CreateProduct } from 'src/entities/products/products.dtos';

export class ProductDto extends ProductModel {}

export class CreateProductDto extends OmitType(ProductModel, [
  'id',
  'createdAt',
  'updatedAt',
]) {
  @IsString()
  @IsNotEmpty()
  @Max(255)
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @Max(1000)
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

  // @IsUUID('4')
  // @IsNotEmpty()
  // readonly categoryId: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
