import { faker } from '@faker-js/faker';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CostumerDto,
  CreateCostumerDto,
  UpdateCostumerDto,
} from 'src/users/schemas/costumers.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CostumersService {
  private costumers: CostumerDto[] = null;

  constructor() {
    this.costumers = [];
    for (let i = 0; i < 5; i++) {
      this.costumers.push({
        customerId: faker.datatype.uuid(),
        name: faker.name.fullName(),
        lastName: faker.name.lastName(),
        phone: faker.phone.number(),
        createdAt: faker.date.past(),
      });
    }
  }

  findAll(): CostumerDto[] {
    const costumers = this.costumers;
    if (costumers.length === 0) {
      throw new NotFoundException('No costumers found');
    }
    return costumers;
  }

  findByAttr<T>(value: T, attr: T) {
    const costumer = this.costumers.find((costumer) => {
      return costumer[`${attr}`] === value;
    });
    if (!costumer) {
      throw new NotFoundException('No costumer found');
    }
    return costumer;
  }

  create(costumer: CreateCostumerDto): CostumerDto {
    const customerId = uuidv4();
    const newCostumer: CostumerDto = {
      customerId,
      ...costumer,
      createdAt: new Date(),
    };
    this.addCostumer(newCostumer);
    return newCostumer;
  }

  addCostumer(costumer: CostumerDto): void {
    this.costumers.push(costumer);
  }

  update(
    id: CostumerDto['customerId'],
    changes: UpdateCostumerDto,
  ): CostumerDto {
    this.findByAttr<CostumerDto['customerId']>(id, 'customerId');

    const index = this.costumers.findIndex(
      (customer) => customer.customerId === id,
    );

    this.costumers[index] = {
      ...this.costumers[index],
      ...changes,
    };
    return this.costumers[index];
  }

  delete(id: CostumerDto['customerId']): void {
    this.findByAttr<CostumerDto['customerId']>(id, 'customerId');

    const index = this.costumers.findIndex(
      (customer) => customer.customerId === id,
    );

    this.costumers.splice(index, 1);
  }
}
