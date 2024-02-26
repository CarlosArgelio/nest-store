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
import { ResponseModel } from 'src/base.model';
import {
  CostumerDto,
  CreateCostumerDto,
} from 'src/users/schemas/costumers.dto';
import { CostumersService } from 'src/users/services/costumers/costumers.service';

@Controller('costumers')
export class CostumersController {
  constructor(private costumerServices: CostumersService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): ResponseModel<CostumerDto[]> {
    const constumers = this.costumerServices.findAll();

    return {
      statusCode: HttpStatus.OK,
      data: constumers,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateCostumerDto): ResponseModel<CostumerDto> {
    const newCostumer = this.costumerServices.create(payload);

    return {
      statusCode: HttpStatus.OK,
      data: newCostumer,
    };
  }

  @Put(':customerId')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('customerId', ParseUUIDPipe) customerId: CostumerDto['customerId'],
    @Body() changes: any,
  ): ResponseModel<CostumerDto> {
    const updateCostumer = this.costumerServices.update(customerId, changes);

    return {
      statusCode: HttpStatus.OK,
      data: updateCostumer,
    };
  }

  @Delete(':customerId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param('customerId', ParseUUIDPipe) customerId: CostumerDto['customerId'],
  ): void {
    this.costumerServices.delete(customerId);
  }
}
