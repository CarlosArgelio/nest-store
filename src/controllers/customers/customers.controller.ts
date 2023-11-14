import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  CreateCustomersDto,
  UpdateCustomersDto,
} from 'src/dtos/customers/customers.dtos';
import { CustomersService } from 'src/services/customers/customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private CustomersServices: CustomersService) {}
  @Get('')
  getCustomers() {
    const customers = this.CustomersServices.findAll();
    return customers;
  }
  @Get(':customerId')
  getUniqueCustomer(@Param('customerId', ParseIntPipe) customerId: number) {
    const customer = this.CustomersServices.findOne(customerId);
    return customer;
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  postCustomers(@Body() payload: CreateCustomersDto) {
    const newCostumer = this.CustomersServices.create(payload);
    return newCostumer;
  }

  @Put(':customerId')
  putCustomers(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() payload: UpdateCustomersDto,
  ) {
    const customer = this.CustomersServices.update(customerId, payload);
    console.log(customer);

    return customer;
  }

  @Delete(':customerId')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteCustomers(@Param('customerId', ParseIntPipe) customerId: number) {
    const customer = this.CustomersServices.delete(customerId);
    return customer;
  }
}
