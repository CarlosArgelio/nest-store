import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    private readonly productRepo: Repository<ProductModel>,
  ) {}

  async findAll(): Promise<ProductDto[]> {
    let products = null;

    try {
      products = await this.productRepo.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (products.length === 0) {
      throw new NotFoundException('Products not found');
    }
    return products;
  }

  async findOne(id: ProductDto['id']): Promise<ProductDto> {
    let product: ProductDto | undefined = undefined;
    try {
      product = await this.productRepo.findOne({ id: id });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async create(product: CreateProductDto): Promise<ProductDto> {
    try {
      const createProduct = this.productRepo.create(product);
      return await this.productRepo.save(createProduct);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    id: ProductDto['id'],
    changes: UpdateProductDto,
  ): Promise<ProductDto> {
    const product = await this.findOne(id);

    try {
      this.productRepo.merge(product, changes);
      return await this.productRepo.save(product);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: ProductDto['id']): Promise<void> {
    await this.findOne(id);
    try {
      this.productRepo.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
