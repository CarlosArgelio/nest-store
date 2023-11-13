import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

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
  @Get('/products/:productId')
  getProduct(@Param('productId') productId: string) {
    return `product ${productId}`;
  }

  @Get('/categories/:categoryId/products/:productId')
  getCategory(
    @Param('productId') productId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return `product ${productId} and ${categoryId}`;
  }
}
