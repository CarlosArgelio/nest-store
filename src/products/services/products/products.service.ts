import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ProductModel } from 'src/products/models/products.entity';
import {
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
} from 'src/products/schemas/products.dto';
import { resolve } from 'path';
import { rejects } from 'assert';

@Injectable()
export class ProductsService {
  private products: ProductDto[] = [];

  constructor(
    @InjectRepository(ProductModel)
    private productRepo: Repository<ProductModel>,
  ) {
    for (let i = 0; i < 5; i++) {
      this.products.push({
        productId: faker.datatype.uuid(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: +faker.commerce.price(),
        stock: faker.datatype.number(),
        image: faker.image.imageUrl(),
        createdAt: new Date(),
        updatedAt: new Date(),
        // categoryId: faker.datatype.uuid(),
      });
    }
  }

  async findAll(): Promise<ProductDto[]> {
    const products = await this.productRepo.find();
    if (!products) {
      throw new NotFoundException('Products not found');
    }
    return products;
  }

  async findOne(id: ProductDto['productId']): Promise<ProductDto> {
    const product = await this.productRepo.findOne({ productId: id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  // create(product: CreateProductDto): ProductDto {
  //   const productId = uuidv4();
  //   const newProduct = {
  //     ...product,
  //     productId,
  //     createdAt: new Date(),
  //   };
  //   this.addProduct(newProduct);
  //   return newProduct;
  // }

  // addProduct(product: ProductDto): void {
  //   this.products.push(product);
  // }

  // update(id: ProductDto['productId'], changes: UpdateProductDto): ProductDto {
  //   // validate exist product
  //   this.findOne(id);

  //   const index = this.products.findIndex((p) => p.productId === id);
  //   const updatedProduct = {
  //     ...this.products[index],
  //     ...changes,
  //   };
  //   this.products[index] = updatedProduct;
  //   return updatedProduct;
  // }

  // delete(id: ProductDto['productId']): void {
  //   // validate exits product
  //   this.findOne(id);

  //   const index = this.products.findIndex((p) => p.productId === id);
  //   this.products.splice(index, 1);
  // }
}
