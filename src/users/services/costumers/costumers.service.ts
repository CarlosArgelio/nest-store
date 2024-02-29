import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CostumerModel } from 'src/users/models/costumers.entity';
import {
  CostumerDto,
  CreateCostumerDto,
  UpdateCostumerDto,
} from 'src/users/schemas/costumers.dto';

@Injectable()
export class CostumersService {
  constructor(
    @InjectRepository(CostumerModel)
    private costumerRepo: Repository<CostumerModel>,
  ) {}

  async findAll(): Promise<CostumerDto[]> {
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

  async create(costumer: CreateCostumerDto): Promise<CostumerDto> {
    try {
      const newCostumer = this.costumerRepo.create(costumer);
      return await this.costumerRepo.save(newCostumer);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    id: CostumerDto['customerId'],
    changes: UpdateCostumerDto,
  ): Promise<CostumerDto> {
    const costumer = await this.findByAttr<CostumerDto['customerId']>(
      id,
      'customerId',
    );

    try {
      this.costumerRepo.merge(costumer, changes);
      const saveCostumer = await this.costumerRepo.save(costumer);
      return saveCostumer;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: CostumerDto['customerId']): Promise<void> {
    await this.findByAttr<CostumerDto['customerId']>(id, 'customerId');
    try {
      await this.costumerRepo.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
