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
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import PaginationParams from 'src/utils/paginate';

@Controller('products')
export class ProductsController {
  @Get('')
  findAllProducts(
    @Query() params: PaginationParams,
    @Query('brand') brand: string,
  ) {
    const { limit = 10, offset = 1 } = params;
    return {
      message: `products ${limit} and ${offset} => ${brand}`,
    };
  }
  @Get('/:productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Res() response: Response, @Param('productId') productId: number) {
    // Not recommendable
    response.status(200).json({
      product: `product ${productId}`,
    });
  }

  @Post('')
  postProducts(@Body() payload: any) {
    return {
      message: 'post products',
      payload,
    };
  }

  @Put(':productId')
  putProducts(@Param() productId: number, @Body() payload: any) {
    return {
      productId,
      payload,
    };
  }

  @Delete(':productId')
  deleteProducts(@Param() productId: number) {
    return { productId };
  }
}
