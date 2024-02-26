import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { firstValueFrom } from 'rxjs';

export enum env {
  development = 'development',
  production = 'production',
}

const API_KEY = '123456';
const API_KEY_PROD = 'PROD_XYZ';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 1000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue:
        process.env.NODE_ENV === env.production ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = http.get('https://jsonplaceholder.typicode.com/todos');
        const value = await firstValueFrom(tasks);
        return value;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
