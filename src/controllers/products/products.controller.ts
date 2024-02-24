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
  Query,
} from '@nestjs/common';
import {
  CreateProduct,
  Products,
  ProductID,
  UpdateProduct,
} from '../../entities/products/products.dtos';
import { ResponseModel } from 'src/base.model';

import { ProductsService } from './../../services/products/products.service';

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
  constructor(private productsService: ProductsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ): ResponseModel<Products[]> {
    console.log(limit);
    console.log(offset);
    console.log(brand);

    return {
      statusCode: HttpStatus.OK,
      data: this.productsService.findAll(),
    };
  }

  @Get('/filter')
  @HttpCode(HttpStatus.OK)
  findFilter(): ResponseModel<Products[]> {
    return {
      statusCode: HttpStatus.OK,
      data: responseFake,
    };
  }

  @Get('/:productId')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('productId') productId: ProductID['productId'],
  ): ResponseModel<Products> {
    const response = {
      ...responseFake[0],
      productId: productId,
    };
    return {
      statusCode: HttpStatus.OK,
      data: response,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateProduct): ResponseModel<Products> {
    const id = '1';
    const response = {
      ...payload,
      productId: id,
    };

    return {
      statusCode: HttpStatus.CREATED,
      data: response,
    };
  }

  @Put('/:productId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('productId') productId: ProductID['productId'],
    @Body() payload: UpdateProduct,
  ): ResponseModel<Products> {
    const id = productId;
    const response = {
      ...payload,
      productId: id,
    };
    return {
      statusCode: HttpStatus.OK,
      data: response,
    };
  }

  @Delete('/:productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param('productId') productId: ProductID['productId'],
  ): ResponseModel<any> {
    console.log(productId);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      data: 'deleted',
    };
  }
}
