import { PartialType, OmitType } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { ProductModel } from 'src/products/models/products.entity';
// import { CreateProduct } from 'src/entities/products/products.dtos';

export class ProductDto extends ProductModel {}

export class CreateProductDto extends OmitType(ProductModel, [
  'productId',
  'createdAt',
  'updatedAt',
  'deletedAt',
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

  @IsArray()
  readonly images: string[];

  @IsNumber()
  @IsNotEmpty()
  @Min(5)
  readonly stock: number;

  @IsUUID('4')
  @IsNotEmpty()
  readonly categoryId: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
