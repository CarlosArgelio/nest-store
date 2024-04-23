import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindCondition, Repository } from 'typeorm';

import { FilterDto } from 'src/base.dto';
import { CategoryModel } from 'src/products/models/categories.entity';
import { ProductModel } from 'src/products/models/products.entity';
import { BrandDto } from 'src/products/schemas/brands.dto';
import {
  CreateProductDto,
  FilterProductsDto,
  ProductDto,
  UpdateProductDto,
} from 'src/products/schemas/products.dto';

import { BrandsService } from '../brands/brands.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductModel)
    private readonly productRepo: Repository<ProductModel>,

    @InjectRepository(CategoryModel)
    private categoryRepo: Repository<CategoryModel>,

    private readonly brandServices: BrandsService,
  ) {}

  async findAll(params?: FilterProductsDto): Promise<ProductModel[]> {
    let products: ProductModel[] | undefined;
    let take: FilterDto['limit'];
    let skip: FilterDto['offset'];
    const where: FindCondition<ProductModel> = {};

    try {
      if (params !== undefined) {
        take = params.limit;
        skip = params.offset;

        const { maxPrice, minPrice } = params;

        if (maxPrice && minPrice) {
          where.price = Between(minPrice, maxPrice);
        }

        products = await this.productRepo.find({
          relations: ['brand'],
          where,
          take,
          skip,
        });
      } else {
        products = await this.productRepo.find({
          relations: ['brand'],
          where,
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (products.length === 0) {
      throw new NotFoundException('Products not found');
    }
    return products;
  }

  async findOne(id: ProductDto['id']): Promise<ProductModel> {
    let product: ProductModel | undefined;
    try {
      product = await this.productRepo.findOne(id, {
        relations: ['brand', 'categories'],
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (product === undefined) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async create(product: CreateProductDto): Promise<ProductDto | ProductModel> {
    try {
      const createProduct = this.productRepo.create(product);
      if (product.brandId) {
        const brand = await this.brandServices.findByAttr<BrandDto['id']>(
          product.brandId,
          'id',
        );
        createProduct.brand = brand;
      }
      if (product.categoriesIds) {
        const categories = await this.categoryRepo.findByIds(
          product.categoriesIds,
        );

        createProduct.categories = categories;
      }

      return await this.productRepo.save(createProduct);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    id: ProductModel['id'],
    changes: UpdateProductDto,
  ): Promise<ProductModel> {
    const product = await this.findOne(id);

    if (changes.brandId) {
      const brand = await this.brandServices.findByAttr<BrandDto['id']>(
        changes.brandId,
        'id',
      );
      product.brand = brand;
    }

    try {
      this.productRepo.merge(product, changes);
      return await this.productRepo.save(product);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async removeCategoryByProduct(
    productId: ProductModel['id'],
    categoryId: CategoryModel['id'],
  ) {
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepo.save(product);
  }

  async addCategoryByProduct(
    productId: ProductModel['id'],
    categoryId: CategoryModel['id'],
  ) {
    const category = await this.categoryRepo.findOne(categoryId);
    const product = await this.productRepo.findOne(productId, {
      relations: ['categories'],
    });
    product.categories.push(category);
    return this.productRepo.save(product);
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
