import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import PaginationParams from 'src/utils/paginate';

@Controller('products')
export class ProductsController {
  @Get('/:productId')
  getProduct(@Param('productId') productId: number) {
    return { product: `product ${productId}` };
  }

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
