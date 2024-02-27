import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import {
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/schemas/categories.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryModel } from 'src/products/models/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryModel)
    private categoryRepo: Repository<CategoryModel>,
  ) {}

  async findAll(): Promise<CategoryDto[]> {
    const categories = await this.categoryRepo.find();
    if (!categories) {
      throw new NotFoundException('No categories found');
    }
    return categories;
  }

  async finByAttribute<T>(value: T, attribute: T): Promise<CategoryDto> {
    let options = {};
    options[`${attribute}`] = value;

    const category = await this.categoryRepo.findOne({ where: options });
    if (!category) {
      throw new NotFoundException(
        `No category found with ${attribute} ${value}`,
      );
    }
    return category;
  }

  async create(category: CreateCategoryDto): Promise<CategoryDto> {
    const categoryId = uuidv4();
    const newCategory = {
      categoryId,
      ...category,
    };

    this.categoryRepo.create(newCategory);
    const saveCategory = await this.categoryRepo.save(newCategory);

    return saveCategory;
  }

  async update(
    id: CategoryDto['categoryId'],
    changes: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    const product = await this.finByAttribute<CategoryDto['categoryId']>(
      id,
      'categoryId',
    );

    this.categoryRepo.merge(product, changes);
    const updateCategory = await this.categoryRepo.save(product);

    return updateCategory;
  }

  async delete(id: CategoryDto['categoryId']): Promise<void> {
    await this.finByAttribute<CategoryDto['categoryId']>(id, 'categoryId');
    await this.categoryRepo.delete(id);
  }
}
