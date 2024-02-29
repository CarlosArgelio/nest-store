import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CustomerModel } from 'src/users/models/customers.entity';
import {
  CreateCustomerDto,
  CustomerDto,
  UpdateCustomerDto,
} from 'src/users/schemas/customers.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerModel)
    private costumerRepo: Repository<CustomerModel>,
  ) {}

  async findAll(): Promise<CustomerDto[]> {
    let costumers = null;
    try {
      costumers = await this.costumerRepo.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (costumers.length === 0) {
      throw new NotFoundException('No costumers found');
    }
    return costumers;
  }

  async findByAttr<T>(value: T, attr: T) {
    let costumer = null;
    const options = {};
    options[`${attr}`] = value;

    try {
      costumer = await this.costumerRepo.findOne({ where: options });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    if (!costumer) {
      throw new NotFoundException('No costumer found');
    }
    return costumer;
  }

  async create(costumer: CreateCustomerDto): Promise<CustomerDto> {
    try {
      const newCostumer = this.costumerRepo.create(costumer);
      return await this.costumerRepo.save(newCostumer);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    id: CustomerDto['id'],
    changes: UpdateCustomerDto,
  ): Promise<CustomerDto> {
    const costumer = await this.findByAttr<CustomerDto['id']>(id, 'id');

    try {
      this.costumerRepo.merge(costumer, changes);
      const saveCostumer = await this.costumerRepo.save(costumer);
      return saveCostumer;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: CustomerDto['id']): Promise<void> {
    await this.findByAttr<CustomerDto['id']>(id, 'id');
    try {
      await this.costumerRepo.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
