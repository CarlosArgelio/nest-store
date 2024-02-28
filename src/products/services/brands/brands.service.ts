import { faker } from '@faker-js/faker';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    let brands = null;
    try {
      brands = await this.brandRepo.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (brands.length === 0) {
      throw new NotFoundException('No brands found');
    }
    return brands;
  }

  async findByAttr<T>(value: T, attr: T): Promise<BrandDto> {
    let brand = null;
    let options = {};
    options[`${attr}`] = value;

    try {
      brand = await this.brandRepo.findOne({ where: options });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
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

    try {
      this.brandRepo.create(newBrand);
      const saveBrand = this.brandRepo.save(newBrand);
      return saveBrand;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    brandId: BrandDto['brandId'],
    changes: UpdateBrandDto,
  ): Promise<BrandDto> {
    const brand = await this.findByAttr<BrandDto['brandId']>(
      brandId,
      'brandId',
    );

    try {
      this.brandRepo.merge(brand, changes);
      const updateBrand = this.brandRepo.save(brand);
      return updateBrand;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(brandId: BrandDto['brandId']): Promise<void> {
    this.findByAttr<BrandDto['brandId']>(brandId, 'brandId');

    try {
      this.brandRepo.delete(brandId);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
