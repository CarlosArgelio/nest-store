import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCategory, ICategory } from './categories.dtos';
import { ResponseModel } from 'src/base.model';

const responseFake: ICategory[] = [
  {
    categoryId: '1',
    name: 'Category 1',
    image: ['image1', 'image2'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Controller('categories')
export class CategoriesController {
  @Get()
  findAll(): ResponseModel<ICategory[]> {
    return {
      statusCode: 200,
      data: responseFake,
    };
  }

  @Get('/:categoryId')
  findOne(@Param('categoryId') categoryId: any): ResponseModel<ICategory> {
    const response = {
      ...responseFake[0],
      categoryId,
    };

    return {
      statusCode: 200,
      data: response,
    };
  }

  @Post()
  create(@Body() payload: CreateCategory): ResponseModel<ICategory> {
    const response = {
      ...responseFake[0],
      ...payload,
    };

    return {
      statusCode: 201,
      data: response,
    };
  }

  @Put('/:categoryId')
  update(
    @Param('categoryId') categoryId: any,
    @Body() payload: any,
  ): ResponseModel<ICategory> {
    const response = {
      ...responseFake[0],
      ...payload,
      categoryId,
    };

    return {
      statusCode: 200,
      data: response,
    };
  }

  @Delete('/:categoryId')
  delete(@Param('categoryId') categoryId: any): ResponseModel<any> {
    console.log(categoryId);
    return {
      statusCode: 204,
      data: 'remove',
    };
  }
}
