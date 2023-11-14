import { CreateBrandDto, UpdateBrandDto } from './brands.dtos';

describe('CreateBrandDto', () => {
  it('should be defined', () => {
    expect(new CreateBrandDto()).toBeDefined();
  });
});

describe('UpdateBrandDto', () => {
  it('should be defined', () => {
    expect(new UpdateBrandDto()).toBeDefined();
  });
});
