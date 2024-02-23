import { Product } from './products.model';

export interface CreateProduct extends Omit<Product, 'productId'> {}
