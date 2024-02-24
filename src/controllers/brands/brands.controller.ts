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
import { BrandID, IBrand } from '../../entities/brands/brands.dtos';

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
  findOne(
    @Param('brandId') brandId: BrandID['brandId'],
  ): ResponseModel<IBrand> {
    const response = {
      ...responseFake[0],
      brandId,
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
    @Param('brandId') brandId: BrandID['brandId'],
    @Body() changes: any,
  ): ResponseModel<IBrand> {
    const response = {
      ...responseFake[0],
      brandId,
      ...changes,
    };

    return {
      statusCode: 200,
      data: response,
    };
  }

  @Delete(':brandId')
  delete(@Param('brandId') brandId: BrandID['brandId']): ResponseModel<any> {
    console.log('🚀 ~ BrandsController ~ delete ~ id:', brandId);
    return {
      statusCode: 204,
      data: 'remove',
    };
  }
}
