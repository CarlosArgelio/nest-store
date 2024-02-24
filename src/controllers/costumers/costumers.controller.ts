import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCustomer, CustomerID, ICustomer } from './customers.dtos';
import { ResponseModel } from 'src/base.model';

const responseFake: ICustomer[] = [
  {
    name: 'Juan',
    lastName: 'Perez',
    customerId: 'XXX',
    phone: 'XXX',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Controller('costumers')
export class CostumersController {
  @Get()
  findAll(): ResponseModel<ICustomer[]> {
    return {
      statusCode: 200,
      data: responseFake,
    };
  }

  @Post()
  create(@Body() payload: CreateCustomer): ResponseModel<ICustomer> {
    const response: ICustomer = {
      ...payload,
      customerId: 'XXX',
      createdAt: new Date(),
    };

    return {
      statusCode: 200,
      data: response,
    };
  }

  @Put(':customerId')
  update(
    @Param('customerId') customerId: CustomerID['customerId'],
    @Body() payload: any,
  ): ResponseModel<ICustomer> {
    const response = {
      ...responseFake[0],
      ...payload,
      customerId,
    };

    return {
      statusCode: 200,
      data: response,
    };
  }

  @Delete(':customerId')
  delete(
    @Param('customerId') customerId: CustomerID['customerId'],
  ): ResponseModel<any> {
    console.log(customerId);
    return {
      statusCode: 204,
      data: 'remove',
    };
  }
}
