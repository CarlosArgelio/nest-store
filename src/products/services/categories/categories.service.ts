import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {} from '@nestjs/common';

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
    let categories = null;
    try {
      categories = await this.categoryRepo.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (categories.length === 0) {
      throw new NotFoundException('No categories found');
    }
    return categories;
  }

  async finByAttribute<T>(value: T, attribute: T): Promise<CategoryDto> {
    let category = null;
    let options = {};
    options[`${attribute}`] = value;

    try {
      category = await this.categoryRepo.findOne({ where: options });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
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

    try {
      this.categoryRepo.create(newCategory);
      const saveCategory = await this.categoryRepo.save(newCategory);

      return saveCategory;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    id: CategoryDto['categoryId'],
    changes: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    const product = await this.finByAttribute<CategoryDto['categoryId']>(
      id,
      'categoryId',
    );

    try {
      this.categoryRepo.merge(product, changes);
      const updateCategory = await this.categoryRepo.save(product);
      return updateCategory;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: CategoryDto['categoryId']): Promise<void> {
    await this.finByAttribute<CategoryDto['categoryId']>(id, 'categoryId');
    try {
      await this.categoryRepo.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
