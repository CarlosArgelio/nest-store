import { Controller, Get, Param, Query } from '@nestjs/common';
import PaginationParams from 'src/utils/paginate';

@Controller('products')
export class ProductsController {
  @Get('/filter')
  getProductFilter() {
    return `Iam filter`;
  }
  @Get('/:productId')
  getProduct(@Param('productId') productId: string) {
    return `product ${productId}`;
  }

  @Get('')
  findAllProducts(
    @Query() params: PaginationParams,
    @Query('brand') brand: string,
  ) {
    const { limit = 10, offset = 1 } = params;
    return `products ${limit} and ${offset} => ${brand}`;
  }
}
