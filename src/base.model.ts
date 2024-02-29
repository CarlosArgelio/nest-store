import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export interface ResponseModel<T> {
  statusCode: number;
  data: T;
}

export class BaseClassModel {
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt?: Date;
}
