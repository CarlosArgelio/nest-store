import { Controller, Get, Post, Param, Delete, Put } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get('')
  getCustomers() {
    return {};
  }

  @Post('')
  postCustomers() {
    return {};
  }

  @Get(':customerId')
  getUniqueCustomer(@Param() customerId: string) {
    return { customer: `${customerId}` };
  }

  @Put(':customerId')
  putCustomers(@Param() customerId: string) {
    return { customer: `${customerId}` };
  }

  @Delete(':customerId')
  deleteCustomers(@Param() customerId: string) {
    return { customer: `${customerId}` };
  }
}
