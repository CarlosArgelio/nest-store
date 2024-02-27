import { OmitType, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  IsUrl,
  Min,
} from 'class-validator';

import { ProductModel } from 'src/products/models/products.entity';
// import { CreateProduct } from 'src/entities/products/products.dtos';

export class ProductDto extends ProductModel {}

export class CreateProductDto extends OmitType(ProductModel, [
  'productId',
  'createdAt',
  'updatedAt',
]) {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(5)
  readonly stock: number;

  @IsUUID('4')
  @IsNotEmpty()
  readonly categoryId: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
