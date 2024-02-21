import { Controller, Get, Param } from '@nestjs/common';
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

  @Get('/products/:productId')
  getProducts(@Param('productId') productId: any) {
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
