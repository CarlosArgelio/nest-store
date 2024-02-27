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
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { ResponseModel } from 'src/base.model';
import {
  CreateProductDto,
  ProductDto,
  UpdateProductDto,
} from 'src/products/schemas/products.dto';

import { ProductsService } from '../../services/products/products.service';

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
  async findAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ): Promise<ResponseModel<ProductDto[]>> {
    console.log(limit);
    console.log(offset);
    console.log(brand);
    const products = await this.productsService.findAll();
    return {
      statusCode: HttpStatus.OK,
      data: products,
    };
  }

  @Get('/:productId')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'productId',
  })
  async findOne(
    @Param('productId', ParseUUIDPipe) productId: ProductDto['productId'],
  ): Promise<ResponseModel<ProductDto>> {
    const product = await this.productsService.findOne(productId);
    return {
      statusCode: HttpStatus.OK,
      data: product,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateProductDto,
  ): Promise<ResponseModel<ProductDto>> {
    const newProduct = await this.productsService.create(payload);

    return {
      statusCode: HttpStatus.CREATED,
      data: newProduct,
    };
  }

  @Put('/:productId')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'productId',
  })
  async update(
    @Param('productId', ParseUUIDPipe) productId: ProductDto['productId'],
    @Body() changes: UpdateProductDto,
  ): Promise<ResponseModel<ProductDto>> {
    const product = await this.productsService.update(productId, changes);
    return {
      statusCode: HttpStatus.OK,
      data: product,
    };
  }

  @Delete('/:productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'productId',
  })
  async delete(
    @Param('productId', ParseUUIDPipe) productId: ProductDto['productId'],
  ): Promise<void> {
    await this.productsService.delete(productId);
  }
}
