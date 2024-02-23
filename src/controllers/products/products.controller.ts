import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get('/products/filter')
  getProductFilter() {
    return `I am a filter`;
  }

  @Get('/products')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return `Products limit ${limit} and offset ${offset} and brand => ${brand}`;
  }

  @Get('/products/:productId')
  getProduct(@Param('productId') productId: any) {
    return `Product with id ${productId}`;
  }
}
