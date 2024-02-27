import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { faker } from '@faker-js/faker';
import {
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
} from 'src/products/schemas/products.dto';

@Injectable()
export class ProductsService {
  private products: ProductDto[] = [];
  constructor() {
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

  findAll(): ProductDto[] {
    const products = this.products;
    if (products.length === 0) {
      throw new NotFoundException('Products not found');
    }
    return products;
  }

  findOne(id: ProductDto['productId']): ProductDto {
    const product = this.products.find((product) => product.productId === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  create(product: CreateProductDto): ProductDto {
    const productId = uuidv4();
    const newProduct = {
      ...product,
      productId,
      createdAt: new Date(),
    };
    this.addProduct(newProduct);
    return newProduct;
  }

  addProduct(product: ProductDto): void {
    this.products.push(product);
  }

  update(id: ProductDto['productId'], changes: UpdateProductDto): ProductDto {
    // validate exist product
    this.findOne(id);

    const index = this.products.findIndex((p) => p.productId === id);
    const updatedProduct = {
      ...this.products[index],
      ...changes,
    };
    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  delete(id: ProductDto['productId']): void {
    // validate exits product
    this.findOne(id);

    const index = this.products.findIndex((p) => p.productId === id);
    this.products.splice(index, 1);
  }
}
