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
  CostumerDto,
  CreateCostumerDto,
  UpdateCostumerDto,
} from 'src/users/schemas/costumers.dto';
import { CostumersService } from 'src/users/services/costumers/costumers.service';

@ApiTags('costumers')
@Controller('costumers')
export class CostumersController {
  constructor(private costumerServices: CostumersService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ResponseModel<CostumerDto[]>> {
    const constumers = await this.costumerServices.findAll();
    return { statusCode: HttpStatus.OK, data: constumers };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateCostumerDto,
  ): Promise<ResponseModel<CostumerDto>> {
    const newCostumer = await this.costumerServices.create(payload);
    return { statusCode: HttpStatus.OK, data: newCostumer };
  }

  @Put(':customerId')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'customerId',
  })
  async update(
    @Param('customerId', ParseUUIDPipe) customerId: CostumerDto['customerId'],
    @Body() changes: UpdateCostumerDto,
  ): Promise<ResponseModel<CostumerDto>> {
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
    @Param('customerId', ParseUUIDPipe) customerId: CostumerDto['customerId'],
  ) {
    await this.costumerServices.delete(customerId);
  }
}
