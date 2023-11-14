import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dtos/categories.dtos';
import { CategoriesService } from 'src/products/services/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private CategoriesServices: CategoriesService) {}
  @Get('')
  getCategories() {
    const categories = this.CategoriesServices.findAll();
    return categories;
  }

  @Get('/:categoryId')
  getUniqueCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    const category = this.CategoriesServices.findOne(categoryId);
    return category;
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  postCategories(@Body() payload: CreateCategoryDto) {
    const newCategory = this.CategoriesServices.create(payload);
    return newCategory;
  }

  @Put('/:categoryId')
  putCategories(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    const category = this.CategoriesServices.update(categoryId, payload);
    return category;
  }

  @Delete('/:categoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteCategories(@Param('categoryId', ParseIntPipe) categoryId: number) {
    const category = this.CategoriesServices.delete(categoryId);
    return category;
  }
}
