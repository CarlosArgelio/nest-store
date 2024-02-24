import { Injectable } from '@nestjs/common';

import { Product } from './../../entities/products/product.entity';

@Injectable()
export class ServicesService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      stock: 10,
      image: ['image.png'],
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: Product['id']) {
    return this.products.find((product) => product.id === id);
  }

  create(product: Product) {
    this.products.push(product);
    return product;
  }

  update(id: Product['id'], product: Product) {
    const index = this.products.findIndex((p) => p.id === id);
    this.products[index] = product;
    return product;
  }

  delete(id: Product['id']) {
    const index = this.products.findIndex((p) => p.id === id);
    delete this.products[index];
    return id;
  }
}
