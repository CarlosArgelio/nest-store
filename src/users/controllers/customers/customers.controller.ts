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
import { CustomersService } from 'src/users/services/customers/customers.service';

@ApiTags('customers')
@Controller('customers')
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

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: CustomerDto['id'],
    @Body() changes: UpdateCustomerDto,
  ): Promise<ResponseModel<CustomerDto>> {
    const updateCostumer = await this.costumerServices.update(id, changes);
    return { statusCode: HttpStatus.OK, data: updateCostumer };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
  })
  async delete(@Param('id', ParseUUIDPipe) id: CustomerDto['id']) {
    await this.costumerServices.delete(id);
  }
}
