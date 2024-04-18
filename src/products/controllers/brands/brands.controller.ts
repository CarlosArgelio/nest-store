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
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { FilterDto } from 'src/base.dto';
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
  async findAll(
    @Param() params: FilterDto,
  ): Promise<ResponseModel<BrandDto[]>> {
    const brands = await this.brandsService.findAll(params);
    return { statusCode: HttpStatus.OK, data: brands };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
  })
  async findOne(
    @Param('id', ParseUUIDPipe) id: BrandDto['id'],
  ): Promise<ResponseModel<BrandDto>> {
    const brand = await this.brandsService.findOne(id);
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

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: BrandDto['id'],
    @Body() changes: UpdateBrandDto,
  ): Promise<ResponseModel<BrandDto>> {
    const updateBrand = await this.brandsService.update(id, changes);
    return { statusCode: HttpStatus.OK, data: updateBrand };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
  })
  async delete(@Param('id', ParseUUIDPipe) id: BrandDto['id']) {
    await this.brandsService.delete(id);
  }
}
