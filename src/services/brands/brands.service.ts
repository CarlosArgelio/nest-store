import { Injectable } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/dtos/brands/brands.dtos';
import { Brand } from 'src/entities/brand.entity';

@Injectable()
export class BrandsService {
  private counterId = 1;

  private brands: Brand[] = [
    {
      id: 1,
      name: 'nike',
    },
  ];

  findAll(): Brand[] {
    return this.brands;
  }

  findOne(id: number): Brand {
    const brand = this.brands.find((item) => item.id === id);
    return brand;
  }

  create(payload: CreateBrandDto) {
    this.counterId = this.counterId + 1;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    const brand = this.findOne(id);
    const index = this.brands.indexOf(brand);
    this.brands[index] = {
      ...brand,
      ...payload,
    };
    return this.brands[index];
  }

  delete(id: number) {
    const index = this.brands.indexOf(this.findOne(id));
    this.brands.splice(index, 1);
    return true;
  }
}
