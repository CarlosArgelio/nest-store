import { Body, Controller, Post } from '@nestjs/common';
import { CreateCustomer } from './customers.dtos';

@Controller('costumers')
export class CostumersController {
  @Post()
  create(@Body() payload: CreateCustomer) {
    return payload;
  }
}
