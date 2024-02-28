import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import {
  BrandDto,
  CreateBrandDto,
  UpdateBrandDto,
} from 'src/products/schemas/brands.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandModel } from 'src/products/models/brands.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandModel) private brandRepo: Repository<BrandModel>,
  ) {}

  async findAll(): Promise<BrandDto[]> {
    const brands = await this.brandRepo.find();
    if (brands.length === 0) {
      throw new NotFoundException('No brands found');
    }
    return brands;
  }

  async findByAttr<T>(value: T, attr: T): Promise<BrandDto> {
    let options = {};
    options[`${attr}`] = value;

    const brand = await this.brandRepo.findOne({ where: options });
    if (!brand) {
      throw new NotFoundException(`Brand with ${attr} ${value} not found`);
    }
    return brand;
  }

  async create(payload: CreateBrandDto): Promise<BrandDto> {
    const brandId = uuidv4();
    const newBrand = {
      ...payload,
      brandId,
    };

    this.brandRepo.create(newBrand);
    const saveBrand = this.brandRepo.save(newBrand);

    return saveBrand;
  }

  async update(
    brandId: BrandDto['brandId'],
    changes: UpdateBrandDto,
  ): Promise<BrandDto> {
    const brand = await this.findByAttr<BrandDto['brandId']>(
      brandId,
      'brandId',
    );

    this.brandRepo.merge(brand, changes);
    const updateBrand = this.brandRepo.save(brand);

    return updateBrand;
  }

  async delete(brandId: BrandDto['brandId']): Promise<void> {
    this.findByAttr<BrandDto['brandId']>(brandId, 'brandId');
    this.brandRepo.delete(brandId);
  }
}
