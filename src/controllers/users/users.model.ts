import { BaseModel } from 'src/base.model';

export interface User extends BaseModel {
  userId: string;
  email: string;
  password: string;
  role: string;
}
