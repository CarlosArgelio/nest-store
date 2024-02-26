import { BaseClassModel } from 'src/base.model';

export enum ROLE {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

export class User implements BaseClassModel {
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  userId: string;
  email: string;
  password: string;
  role: ROLE;
}
