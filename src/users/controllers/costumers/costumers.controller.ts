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
  @ApiParam({
    name: 'customerId',
  })
  update(
    @Param('customerId', ParseUUIDPipe) customerId: CostumerDto['customerId'],
    @Body() changes: UpdateCostumerDto,
  ): ResponseModel<CostumerDto> {
    const updateCostumer = this.costumerServices.update(customerId, changes);

    return {
      statusCode: HttpStatus.OK,
      data: updateCostumer,
    };
  }

  @Delete(':customerId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'customerId',
  })
  delete(
    @Param('customerId', ParseUUIDPipe) customerId: CostumerDto['customerId'],
  ): void {
    this.costumerServices.delete(customerId);
  }
}
