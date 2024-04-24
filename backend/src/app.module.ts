import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import { ProductsModule } from './products/products.module';
import { validationEnvSchema } from './schemas';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV]?.file || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: validationEnvSchema,
    }),
    UsersModule,
    ProductsModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 1000,
        maxRedirects: 5,
      }),
    }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
