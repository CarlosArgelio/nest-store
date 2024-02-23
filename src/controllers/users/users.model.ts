import { BaseModel } from 'src/base.model';

export interface User extends BaseModel {
  email: string;
  password: string;
  role: string;
}
