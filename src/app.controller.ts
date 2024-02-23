import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/new')
  newEndpoint() {
    return "I'm new endpoint";
  }

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

  @Get('/categories/:categoryId/:productId')
  getCategory(
    @Param('categoryId') categoryId: any,
    @Param('productId') productId: any,
  ) {
    return `Product ${productId} and category ${categoryId}`;
  }
}
