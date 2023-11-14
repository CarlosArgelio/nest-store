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
  // Res,
} from '@nestjs/common';
// import { Response } from 'express';
import { ProductsService } from 'src/services/products/products.service';
import PaginationParams from 'src/utils/paginate';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('')
  findAllProducts(
    @Query() params: PaginationParams,
    @Query('brand') brand: string,
  ) {
    const { limit = 10, offset = 1 } = params;
    const product = this.productsService.findAll();
    const response = { limit, offset, brand: brand ?? null, product };
    return response;
    // return {
    //   message: `products ${limit} and ${offset} => ${brand}`,
    // };
  }
  @Get('/:productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId') productId: string) {
    // Not recommendable
    // response.status(200).json({
    //   product: `product ${productId}`,
    // });
    return this.productsService.findOne(+productId);
  }

  @Post('')
  postProducts(@Body() payload: any) {
    // return {
    //   message: 'post products',
    //   payload,
    // };
    return this.productsService.create(payload);
  }

  @Put('/:productId')
  putProducts(@Param('productId') productId: string, @Body() payload: any) {
    // return {
    //   productId,
    //   payload,
    // };
    return this.productsService.update(+productId, payload);
  }

  @Delete('/:productId')
  deleteProducts(@Param('productId') productId: string) {
    return this.productsService.delete(+productId);
  }
}
