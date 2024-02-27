import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import {
  BrandDto,
  CreateBrandDto,
  UpdateBrandDto,
} from 'src/products/schemas/brands.dto';

@Injectable()
export class BrandsService {
  private brands: BrandDto[] = null;

  constructor() {
    this.brands = [];
    for (let i = 0; i < 5; i++) {
      this.brands.push({
        brandId: faker.datatype.uuid(),
        name: faker.company.name(),
        createdAt: faker.date.recent(),
      });
    }
  }

  findAll(): BrandDto[] {
    const brands = this.brands;
    if (brands.length === 0) {
      throw new NotFoundException('No brands found');
    }
    return brands;
  }

  findByAttr<T>(value: T, attr: T): BrandDto {
    const brand = this.brands.find((brand) => brand[`${attr}`] === value);
    if (!brand) {
      throw new NotFoundException(`Brand with ${attr} ${value} not found`);
    }
    return brand;
  }

  create(payload: CreateBrandDto): BrandDto {
    const brandId = uuidv4();

    const newBrand = {
      ...payload,
      brandId,
      createdAt: new Date(),
    };

    this.addBrand(newBrand);

    return newBrand;
  }

  addBrand(payload: BrandDto): void {
    this.brands.push(payload);
  }

  update(brandId: BrandDto['brandId'], payload: UpdateBrandDto): BrandDto {
    this.findByAttr<BrandDto['brandId']>(brandId, 'brandId');

    const index = this.brands.findIndex((brand) => brand.brandId === brandId);
    this.brands[index] = {
      ...this.brands[index],
      ...payload,
    };

    return this.brands[index];
  }

  delete(brandId: BrandDto['brandId']): void {
    this.findByAttr<BrandDto['brandId']>(brandId, 'brandId');
    const index = this.brands.findIndex((brand) => brand.brandId === brandId);

    this.brands.splice(index, 1);
  }
}
