import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

export enum env {
  development = 'development',
  production = 'production',
}

const API_KEY = '123456';
const API_KEY_PROD = 'PROD_XYZ';

@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue:
        process.env.NODE_ENV === env.production ? API_KEY_PROD : API_KEY,
    },
  ],
})
export class AppModule {}
