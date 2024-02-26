import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ResponseModel } from 'src/base.model';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

import { ProductsService } from '../../services/products.service';
import {
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
} from 'src/products/schemas/products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all products',
    description: 'Queryes Limit Offset and Brand',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'brand',
    type: Number,
    required: false,
  })
  @HttpCode(HttpStatus.OK)
  findAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ): ResponseModel<ProductDto[]> {
    console.log(limit);
    console.log(offset);
    console.log(brand);
    const products = this.productsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      data: products,
    };
  }

  @Get('/:productId')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('productId', ParseUUIDPipe) productId: ProductDto['productId'],
  ): ResponseModel<ProductDto> {
    const product = this.productsService.findOne(productId);
    return {
      statusCode: HttpStatus.OK,
      data: product,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateProductDto): ResponseModel<ProductDto> {
    const newProduct = this.productsService.create(payload);

    return {
      statusCode: HttpStatus.CREATED,
      data: newProduct,
    };
  }

  @Put('/:productId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('productId', ParseUUIDPipe) productId: ProductDto['productId'],
    @Body() changes: UpdateProductDto,
  ): ResponseModel<ProductDto> {
    const product = this.productsService.update(productId, changes);
    return {
      statusCode: HttpStatus.OK,
      data: product,
    };
  }

  @Delete('/:productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param('productId', ParseUUIDPipe) productId: ProductDto['productId'],
  ): void {
    this.productsService.delete(productId);
  }
}
