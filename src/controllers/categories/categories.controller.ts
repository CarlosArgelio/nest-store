import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCategory } from './categories.dtos';

@Controller('categories')
export class CategoriesController {
  @Get('/:categoryId/:productId')
  getCategory(
    @Param('categoryId') categoryId: any,
    @Param('productId') productId: any,
  ) {
    return `Product ${productId} and category ${categoryId}`;
  }

  @Post()
  create(@Body() payload: CreateCategory) {
    return payload;
  }
}
