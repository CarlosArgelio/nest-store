import { Brands } from './brands.model';

export interface CreateBrand extends Omit<Brands, 'brandId'> {}
