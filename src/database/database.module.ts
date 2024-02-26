import { Module, Global } from '@nestjs/common';

export enum env {
  development = 'development',
  production = 'production',
  staging = 'staging',
}

const API_KEY = '123456';
const API_KEY_PROD = 'PROD_XYZ';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue:
        process.env.NODE_ENV === env.production ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
