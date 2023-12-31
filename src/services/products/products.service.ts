import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/dtos/products/products.dtos';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterIds = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'bla',
      price: 124,
      stock: 12,
      image: 'https://picsum.photos/200/300',
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    console.log(payload);

    this.counterIds = this.counterIds + 1;
    const newProduct = {
      id: this.counterIds,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    const index = this.products.indexOf(product);
    this.products[index] = {
      ...product,
      ...payload,
    };
    return this.products[index];
  }

  delete(id: number) {
    const index = this.products.indexOf(this.findOne(id));
    this.products.splice(index, 1);
    return true;
  }
}
