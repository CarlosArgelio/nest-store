import { BaseModel } from 'src/base.model';

export enum ROLE {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export interface User extends BaseModel {
  userId: string;
  email: string;
  password: string;
  role: ROLE;
}
