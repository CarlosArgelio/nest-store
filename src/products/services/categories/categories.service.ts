import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryModel } from 'src/products/models/categories.entity';
import {
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/schemas/categories.dto';

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

  async finByAttribute<T>(value: T, attribute: T, bool?: boolean) {
    let category = null;
    const options = {};
    options[`${attribute}`] = value;

    try {
      category = await this.categoryRepo.findOne({ where: options });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (!category && (bool === false || bool === undefined)) {
      throw new NotFoundException(
        `No category found with ${attribute} ${value}`,
      );
    } else if (!category && bool === true) {
      return false;
    } else if (category && bool === true) {
      return true;
    }
    return category;
  }

  async create(category: CreateCategoryDto): Promise<CategoryDto> {
    const { image } = category;
    const existImage = await this.finByAttribute<CreateCategoryDto['image']>(
      image,
      'image',
      true,
    );
    if (existImage) {
      throw new BadRequestException('image must be unique');
    }

    try {
      const newCategory = this.categoryRepo.create(category);
      return await this.categoryRepo.save(newCategory);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    id: CategoryDto['id'],
    changes: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    const product = await this.finByAttribute<CategoryDto['id']>(id, 'id');

    try {
      this.categoryRepo.merge(product, changes);
      const updateCategory = await this.categoryRepo.save(product);
      return updateCategory;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: CategoryDto['id']): Promise<void> {
    await this.finByAttribute<CategoryDto['id']>(id, 'id');
    try {
      await this.categoryRepo.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
