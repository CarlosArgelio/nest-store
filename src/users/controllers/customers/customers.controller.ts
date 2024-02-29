import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { ResponseModel } from 'src/base.model';
import {
  CreateCustomerDto,
  CustomerDto,
  UpdateCustomerDto,
} from 'src/users/schemas/customers.dto';
import { CustomersService } from 'src/users/services/costumers/costumers.service';

@ApiTags('costumers')
@Controller('costumers')
export class CostumersController {
  constructor(private costumerServices: CustomersService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ResponseModel<CustomerDto[]>> {
    const constumers = await this.costumerServices.findAll();
    return { statusCode: HttpStatus.OK, data: constumers };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateCustomerDto,
  ): Promise<ResponseModel<CustomerDto>> {
    const newCostumer = await this.costumerServices.create(payload);
    return { statusCode: HttpStatus.OK, data: newCostumer };
  }

  @Put(':customerId')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'customerId',
  })
  async update(
    @Param('customerId', ParseUUIDPipe) customerId: CustomerDto['customerId'],
    @Body() changes: UpdateCustomerDto,
  ): Promise<ResponseModel<CustomerDto>> {
    const updateCostumer = await this.costumerServices.update(
      customerId,
      changes,
    );
    return { statusCode: HttpStatus.OK, data: updateCostumer };
  }

  @Delete(':customerId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'customerId',
  })
  async delete(
    @Param('customerId', ParseUUIDPipe) customerId: CustomerDto['customerId'],
  ) {
    await this.costumerServices.delete(customerId);
  }
}
