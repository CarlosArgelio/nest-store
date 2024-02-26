import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ResponseModel } from 'src/base.model';
import {
  BrandDto,
  CreateBrandDto,
  UpdateBrandDto,
} from 'src/products/schemas/brands.dto';
import { BrandsService } from 'src/products/services/brands/brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}
  @Get()
  findAll(): ResponseModel<BrandDto[]> {
    const brands = this.brandsService.findAll();

    return {
      statusCode: 200,
      data: brands,
    };
  }

  @Get(':brandId')
  findOne(
    @Param('brandId', ParseUUIDPipe) brandId: BrandDto['brandId'],
  ): ResponseModel<BrandDto> {
    const brand = this.brandsService.findByAttr(brandId, 'brandId');
    return {
      statusCode: 200,
      data: brand,
    };
  }

  @Post()
  create(@Body() payload: CreateBrandDto): ResponseModel<BrandDto> {
    const newBrand = this.brandsService.create(payload);
    return {
      statusCode: HttpStatus.CREATED,
      data: newBrand,
    };
  }

  @Put(':brandId')
  update(
    @Param('brandId', ParseUUIDPipe) brandId: BrandDto['brandId'],
    @Body() changes: UpdateBrandDto,
  ): ResponseModel<BrandDto> {
    const updateBrand = this.brandsService.update(brandId, changes);

    return {
      statusCode: 200,
      data: updateBrand,
    };
  }

  @Delete(':brandId')
  delete(@Param('brandId', ParseUUIDPipe) brandId: BrandDto['brandId']): void {
    this.brandsService.delete(brandId);
  }
}
