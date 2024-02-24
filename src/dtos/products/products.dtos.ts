import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsString, IsUUID, IsUrl } from 'class-validator';
// import { CreateProduct } from 'src/entities/products/products.dtos';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  readonly description: string;

  @IsUrl()
  readonly images: string[];

  @IsNumber()
  stock: number;

  @IsUUID(4, { each: true })
  readonly categoryId: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
