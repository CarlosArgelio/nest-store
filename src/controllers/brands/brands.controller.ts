import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get('')
  getBrands() {}

  @Get(':brandId')
  getUniqueBrands(@Param() brandId: string) {
    return `brand ${brandId}`;
  }

  @Post('')
  postBrands() {}

  @Put(':brandId')
  putBrands(@Param() brandId: string) {
    return `brand ${brandId}`;
  }

  @Delete(':brandId')
  deleteBrands(@Param() brandId: string) {
    return `brand ${brandId}`;
  }
}
