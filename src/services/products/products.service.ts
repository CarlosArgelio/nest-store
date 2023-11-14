import { Injectable } from '@nestjs/common';
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

  findsOne(id: number) {
    return this.products.find((item) => item.id == id);
  }

  create(payload: Product) {
    this.counterIds = this.counterIds++;
    const newProduct = {
      id: this.counterIds,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: Product) {
    const product = this.findsOne(id);
    const index = this.products.indexOf(product);
    this.products[index] = {
      ...product,
      ...payload,
    };
    return this.products[index];
  }

  delete(id: number) {
    const index = this.products.indexOf(this.findsOne(id));
    this.products.splice(index, 1);
    return true;
  }
}
