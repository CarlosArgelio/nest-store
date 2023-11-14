import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import PaginationParams from './utils/paginate';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hola Mundo';
  }
  @Get('/new')
  newEndpoint() {
    return 'yo soy nuevo';
  }

  @Get('task')
  hello() {
    return 'without /';
  }
}
