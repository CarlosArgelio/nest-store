import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/dtos/brands/brands.dtos';
import { BrandsService } from 'src/services/brands/brands.service';

@Controller('brands')
export class BrandsController {
  constructor(private brandsServices: BrandsService) {}
  @Get('')
  getBrands() {
    return this.brandsServices.findAll();
  }

  @Get(':brandId')
  getUniqueBrands(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.brandsServices.findOne(brandId);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  postBrands(@Body() payload: CreateBrandDto) {
    return this.brandsServices.create(payload);
  }

  @Put(':brandId')
  putBrands(
    @Param('brandId', ParseIntPipe) brandId: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsServices.update(brandId, payload);
  }

  @Delete(':brandId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteBrands(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.brandsServices.delete(brandId);
  }
}
