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
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { ResponseModel } from 'src/base.model';
import {
  BrandDto,
  CreateBrandDto,
  UpdateBrandDto,
} from 'src/products/schemas/brands.dto';
import { BrandsService } from 'src/products/services/brands/brands.service';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ResponseModel<BrandDto[]>> {
    const brands = await this.brandsService.findAll();
    return { statusCode: HttpStatus.OK, data: brands };
  }

  @Get(':brandId')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'brandId',
  })
  async findOne(
    @Param('brandId', ParseUUIDPipe) brandId: BrandDto['brandId'],
  ): Promise<ResponseModel<BrandDto>> {
    const brand = await this.brandsService.findByAttr(brandId, 'brandId');
    return { statusCode: HttpStatus.OK, data: brand };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateBrandDto,
  ): Promise<ResponseModel<BrandDto>> {
    const newBrand = await this.brandsService.create(payload);
    return { statusCode: HttpStatus.CREATED, data: newBrand };
  }

  @Put(':brandId')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'brandId',
  })
  async update(
    @Param('brandId', ParseUUIDPipe) brandId: BrandDto['brandId'],
    @Body() changes: UpdateBrandDto,
  ): Promise<ResponseModel<BrandDto>> {
    const updateBrand = await this.brandsService.update(brandId, changes);
    return { statusCode: HttpStatus.OK, data: updateBrand };
  }

  @Delete(':brandId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'brandId',
  })
  async delete(@Param('brandId', ParseUUIDPipe) brandId: BrandDto['brandId']) {
    await this.brandsService.delete(brandId);
  }
}
