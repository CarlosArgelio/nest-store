import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BrandModel } from 'src/products/models/brands.entity';
import {
  BrandDto,
  CreateBrandDto,
  UpdateBrandDto,
} from 'src/products/schemas/brands.dto';

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
    const options = {};
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

  async findOne(id: string) {
    const brand = await this.brandRepo.findOne({
      relations: ['products'],
      where: { id },
    });
    return brand;
  }

  async create(brand: CreateBrandDto): Promise<BrandDto> {
    try {
      const newBrand = this.brandRepo.create(brand);
      return this.brandRepo.save(newBrand);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: BrandDto['id'], changes: UpdateBrandDto): Promise<BrandDto> {
    const brand = await this.findByAttr<BrandDto['id']>(id, 'id');

    try {
      this.brandRepo.merge(brand, changes);
      const updateBrand = this.brandRepo.save(brand);
      return updateBrand;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: BrandDto['id']): Promise<void> {
    this.findByAttr<BrandDto['id']>(id, 'id');

    try {
      this.brandRepo.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
