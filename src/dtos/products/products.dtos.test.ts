import { CreateProductDto, UpdateProductDto } from './products.dtos';

describe('CreateProductDto', () => {
  it('should be defined', () => {
    expect(new CreateProductDto()).toBeDefined();
  });
});

describe('UpdateProductDto', () => {
  it('should be defined', () => {
    expect(new UpdateProductDto()).toBeDefined();
  });
});
