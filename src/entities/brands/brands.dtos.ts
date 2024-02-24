import { Brands } from './brands.model';

export interface IBrand extends Brands {}
export interface CreateBrand extends Omit<Brands, 'brandId'> {}
export interface BrandID extends Pick<Brands, 'brandId'> {}
