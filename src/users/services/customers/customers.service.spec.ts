import { Test, TestingModule } from '@nestjs/testing';

import { CostumersService } from './customers.service';

describe('CostumersService', () => {
  let service: CostumersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CostumersService],
    }).compile();

    service = module.get<CostumersService>(CostumersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
