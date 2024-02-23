import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get('/categories/:categoryId/:productId')
  getCategory(
    @Param('categoryId') categoryId: any,
    @Param('productId') productId: any,
  ) {
    return `Product ${productId} and category ${categoryId}`;
  }
}
