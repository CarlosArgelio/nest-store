import { BaseModel } from 'src/base.model';

export interface Product extends BaseModel {
  title: string;
  price: string;
  description: string;
  images: string[];
}
