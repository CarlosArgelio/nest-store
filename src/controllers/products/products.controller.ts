import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Product } from './products.model';

@Controller('products')
export class ProductsController {
  @Get()
  getAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return {
      statusCode: 200,
      message: `Products limit ${limit} and offset ${offset} and brand => ${brand}`,
    };
  }

  @Get('/filter')
  getFilter() {
    return {
      statusCode: 200,
      message: `I am a filter`,
    };
  }

  @Get('/:productId')
  getOne(@Param('productId') productId: any) {
    return {
      statusCode: 200,
      message: `Product with id ${productId}`,
    };
  }

  @Post()
  create(@Body() payload: Product) {
    return {
      message: 'Product created',
      payload,
    };
  }
}
