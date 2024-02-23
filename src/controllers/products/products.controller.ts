import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateProduct,
  Products,
  ProductID,
  UpdateProduct,
} from './products.dtos';
import { ResponseModel } from 'src/base.model';

const responseFake = [
  {
    productId: '1',
    categoryId: '1',
    title: 'Product 1',
    price: 100,
    description: 'bla bla bla',
    images: ['https://image.png'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Controller('products')
export class ProductsController {
  @Get()
  findAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ): ResponseModel<Products[]> {
    console.log(limit);
    console.log(offset);
    console.log(brand);

    return {
      statusCode: 200,
      data: responseFake,
    };
  }

  @Get('/filter')
  findFilter(): ResponseModel<Products[]> {
    return {
      statusCode: 200,
      data: responseFake,
    };
  }

  @Get('/:productId')
  findOne(@Param('productId') productId: ProductID): ResponseModel<Products> {
    console.log(productId);
    return {
      statusCode: 200,
      data: responseFake[0],
    };
  }

  @Post()
  create(@Body() payload: CreateProduct): ResponseModel<Products> {
    const id = '1';
    const response = {
      ...payload,
      productId: id,
    };

    return {
      statusCode: 201,
      data: response,
    };
  }

  @Put('/:productId')
  update(
    @Param('productId') productId: ProductID,
    @Body() payload: UpdateProduct,
  ): ResponseModel<Products> {
    const id = productId.productId;
    const response = {
      ...payload,
      productId: id,
    };
    return {
      statusCode: 200,
      data: response,
    };
  }

  @Delete('/:productId')
  delete(@Param('productId') productId: ProductID): ResponseModel<any> {
    console.log(productId);
    return {
      statusCode: 204,
      data: 'deleted',
    };
  }
}
