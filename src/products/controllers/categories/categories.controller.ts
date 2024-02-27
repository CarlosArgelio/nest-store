import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { ResponseModel } from 'src/base.model';
import {
  CategoryDto,
  CreateCategoryDto,
} from 'src/products/schemas/categories.dto';
import { CategoriesService } from 'src/products/services/categories/categories.service';

@ApiTags('categories')
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
  @ApiParam({
    name: 'categoryId',
  })
  findOne(
    @Param('categoryId', ParseUUIDPipe) categoryId: CategoryDto['categoryId'],
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
  @ApiParam({
    name: 'categoryId',
  })
  update(
    @Param('categoryId', ParseUUIDPipe) categoryId: CategoryDto['categoryId'],
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
  @ApiParam({
    name: 'categoryId',
  })
  delete(
    @Param('categoryId', ParseUUIDPipe) categoryId: CategoryDto['categoryId'],
  ): void {
    this.CategoriesServices.delete(categoryId);
  }
}
