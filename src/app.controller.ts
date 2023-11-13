import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import PaginationParams from './utils/paginate';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hola Mundo';
  }
  @Get('/new')
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('task')
  hello() {
    return 'without /';
  }
  @Get('/products/filter')
  getProductFilter() {
    return `Iam filter`;
  }
  @Get('/products/:productId')
  getProduct(@Param('productId') productId: string) {
    return `product ${productId}`;
  }

  @Get('/products')
  findAllProducts(@Query() params: PaginationParams, @Query('brand') brand: string,) {
    const { limit = 10, offset = 1 } = params;
    return `products ${limit} and ${offset} => ${brand}`;
  }


  @Get('/categories/:categoryId/products/:productId')
  getCategory(
    @Param('productId') productId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return `product ${productId} and ${categoryId}`;
  }
}
