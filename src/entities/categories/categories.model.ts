import { BaseModel } from 'src/base.model';

export interface Category extends BaseModel {
  categoryId: string;
  name: string;
  image: string[];
}
