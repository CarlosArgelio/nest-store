import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get('')
  getCategories() {}

  @Get('/:categoryId')
  getUniqueCategory(@Param('categoryId') categoryId: string) {
    return `category ${categoryId}`;
  }

  @Post('')
  postCategories() {}

  @Put('/:categoryId')
  putCategories(@Param('categoryId') categoryId: string) {
    return `category ${categoryId}`;
  }

  @Delete('/:categoryId')
  deleteCategories(@Param('categoryId') categoryId: string) {
    return `category ${categoryId}`;
  }
}
