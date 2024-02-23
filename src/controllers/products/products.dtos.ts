import { Product } from './products.model';

export interface CreateProduct extends Omit<Product, 'productId'> {}
export interface Products extends Product {}
export interface ProductID extends Pick<Product, 'productId'> {}
export interface UpdateProduct extends CreateProduct {}
