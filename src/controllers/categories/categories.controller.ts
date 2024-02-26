import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ResponseModel } from 'src/base.model';
import { CategoryDto, CreateCategoryDto } from 'src/dtos/categories.dto';
import { CategoriesService } from 'src/services/categories/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private CategoriesServices: CategoriesService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): ResponseModel<CategoryDto[]> {
    const categories = this.CategoriesServices.findAll();
    return {
      statusCode: HttpStatus.OK,
      data: categories,
    };
  }

  @Get('/:categoryId')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('categoryId') categoryId: CategoryDto['categoryId'],
  ): ResponseModel<CategoryDto> {
    const category = this.CategoriesServices.finByAttribute<
      CategoryDto['categoryId']
    >(categoryId, 'categoryId');

    return {
      statusCode: HttpStatus.OK,
      data: category,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateCategoryDto): ResponseModel<CategoryDto> {
    const newCategory = this.CategoriesServices.create(payload);
    return {
      statusCode: HttpStatus.CREATED,
      data: newCategory,
    };
  }

  @Put('/:categoryId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('categoryId') categoryId: CategoryDto['categoryId'],
    @Body() changes: any,
  ): ResponseModel<CategoryDto> {
    const updatedCategory = this.CategoriesServices.update(categoryId, changes);
    return {
      statusCode: HttpStatus.OK,
      data: updatedCategory,
    };
  }

  @Delete('/:categoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('categoryId') categoryId: CategoryDto['categoryId']): void {
    this.CategoriesServices.delete(categoryId);
  }
}
