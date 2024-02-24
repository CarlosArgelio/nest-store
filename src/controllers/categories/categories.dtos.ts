import { Category } from './categories.model';

export interface ICategory extends Category {}
export interface CreateCategory extends Omit<Category, 'categoryId'> {}
export interface CategoryID extends Pick<Category, 'categoryId'> {}
