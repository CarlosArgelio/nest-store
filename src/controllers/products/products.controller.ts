import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `Products limit ${limit} and offset ${offset} and brand => ${brand}`;
  }

  @Get('/filter')
  getProductFilter() {
    return `I am a filter`;
  }

  @Get('/:productId')
  getProduct(@Param('productId') productId: any) {
    return `Product with id ${productId}`;
  }
}
