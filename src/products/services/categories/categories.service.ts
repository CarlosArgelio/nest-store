import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import {
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/schemas/categories.dto';

@Injectable()
export class CategoriesService {
  private categories: CategoryDto[] = null;

  constructor() {
    this.categories = [];
    for (let i = 0; i < 5; i++) {
      this.categories.push({
        name: faker.commerce.productName(),
        categoryId: faker.datatype.uuid(),
        image: faker.image.imageUrl(),
        createdAt: faker.date.recent(),
      });
    }
  }

  findAll(): CategoryDto[] {
    const categories = this.categories;
    if (!categories) {
      throw new NotFoundException('No categories found');
    }
    return categories;
  }

  finByAttribute<T>(value: T, attribute: T): CategoryDto {
    const category = this.categories.find(
      (category) => category[`${attribute}`] === value,
    );
    if (!category) {
      throw new NotFoundException(
        `No category found with ${attribute} ${value}`,
      );
    }
    return category;
  }

  create(category: CreateCategoryDto): CategoryDto {
    const categoryId = uuidv4();

    const newCategory = {
      categoryId,
      ...category,
      createdAt: new Date(),
    };

    this.addCategory(newCategory);
    return newCategory;
  }

  addCategory(category: CategoryDto): void {
    this.categories.push(category);
  }

  update(
    id: CategoryDto['categoryId'],
    changes: UpdateCategoryDto,
  ): CategoryDto {
    this.finByAttribute<CategoryDto['categoryId']>(id, 'categoryId');

    const index = this.categories.findIndex(
      (category) => category.categoryId === id,
    );
    this.categories[index] = {
      ...this.categories[index],
      ...changes,
    };

    return this.categories[index];
  }

  delete(id: CategoryDto['categoryId']): void {
    this.finByAttribute<CategoryDto['categoryId']>(id, 'categoryId');
    const index = this.categories.findIndex(
      (category) => category.categoryId === id,
    );

    this.categories.splice(index, 1);
  }
}
