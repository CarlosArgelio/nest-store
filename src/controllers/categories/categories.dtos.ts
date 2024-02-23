import { Category } from './categories.model';

export interface CreateCategory extends Omit<Category, 'categoryId'> {}
