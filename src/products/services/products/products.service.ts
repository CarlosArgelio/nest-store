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

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductModel)
    private productRepo: Repository<ProductModel>,
  ) {}

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

  async create(product: CreateProductDto): Promise<ProductDto> {
    const newProduct = {
      ...product,
      productId: uuidv4(),
    };

    const createProduct = this.productRepo.create(newProduct);
    return await this.productRepo.save(createProduct);
  }

  async update(
    id: ProductDto['productId'],
    changes: UpdateProductDto,
  ): Promise<ProductDto> {
    const product = await this.findOne(id);
    this.productRepo.merge(product, changes);

    return await this.productRepo.save(product);
  }

  async delete(id: ProductDto['productId']): Promise<void> {
    await this.findOne(id);
    this.productRepo.delete(id);
  }
}
