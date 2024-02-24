import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ResponseModel } from 'src/base.model';
import { IBrand } from './brands.dtos';

const responseFake: IBrand[] = [
  {
    brandId: '1',
    name: 'Samsung',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Controller('brands')
export class BrandsController {
  @Get()
  findAll(): ResponseModel<IBrand[]> {
    return {
      statusCode: 200,
      data: responseFake,
    };
  }

  @Get(':brandId')
  findOne(@Param('brandId') id: string): ResponseModel<IBrand> {
    const response = {
      ...responseFake[0],
      brandId: id,
    };
    return {
      statusCode: 200,
      data: response,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return payload;
  }

  @Put(':brandId')
  update(
    @Param('brandId') id: string,
    @Body() changes: any,
  ): ResponseModel<IBrand> {
    const response = {
      ...responseFake[0],
      brandId: id,
      ...changes,
    };

    return {
      statusCode: 200,
      data: response,
    };
  }

  @Delete(':brandId')
  delete(@Param('brandId') id: string): ResponseModel<any> {
    console.log('🚀 ~ BrandsController ~ delete ~ id:', id);
    return {
      statusCode: 204,
      data: 'remove',
    };
  }
}
