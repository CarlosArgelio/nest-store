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
import {
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { ResponseModel } from 'src/base.model';
import { ErrorResponse } from 'src/common/responses/responses.entity';
import {
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/schemas/categories.dto';
import { CategoriesService } from 'src/products/services/categories/categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private CategoriesServices: CategoriesService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'List of categories',
    isArray: true,
    type: CategoryDto,
  })
  @ApiNotFoundResponse({
    description: 'No categories found',
    type: ErrorResponse,
  })
  async findAll(): Promise<ResponseModel<CategoryDto[]>> {
    const categories = await this.CategoriesServices.findAll();
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
  @ApiOkResponse({
    description: 'List of categories',
    isArray: false,
    type: CategoryDto,
  })
  @ApiNotFoundResponse({
    description: 'No categories found',
    type: ErrorResponse,
  })
  async findOne(
    @Param('categoryId', ParseUUIDPipe) categoryId: CategoryDto['categoryId'],
  ): Promise<ResponseModel<CategoryDto>> {
    const category = await this.CategoriesServices.finByAttribute<
      CategoryDto['categoryId']
    >(categoryId, 'categoryId');

    return {
      statusCode: HttpStatus.OK,
      data: category,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    description: 'List of categories',
    isArray: false,
    type: CategoryDto,
  })
  async create(
    @Body() payload: CreateCategoryDto,
  ): Promise<ResponseModel<CategoryDto>> {
    const newCategory = await this.CategoriesServices.create(payload);
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
  @ApiOkResponse({
    description: 'List of categories',
    isArray: false,
    type: CategoryDto,
  })
  @ApiNotFoundResponse({
    description: 'No categories found',
    type: ErrorResponse,
  })
  async update(
    @Param('categoryId', ParseUUIDPipe) categoryId: CategoryDto['categoryId'],
    @Body() changes: UpdateCategoryDto,
  ): Promise<ResponseModel<CategoryDto>> {
    const updatedCategory = await this.CategoriesServices.update(
      categoryId,
      changes,
    );
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
  @ApiNoContentResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiNotFoundResponse({
    description: 'No categories found',
    type: ErrorResponse,
  })
  async delete(
    @Param('categoryId', ParseUUIDPipe) categoryId: CategoryDto['categoryId'],
  ) {
    await this.CategoriesServices.delete(categoryId);
  }
}
