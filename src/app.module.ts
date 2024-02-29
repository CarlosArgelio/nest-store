import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { firstValueFrom } from 'rxjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';
import { DatabaseModule } from './database/database.module';
import { Environment, enviroments } from './enviroments';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV]?.file || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .equal(
            Environment.Development,
            Environment.Production,
            Environment.Staging,
          )
          .required(),
        API_KEY: Joi.number(),
        DATABASE_NAME: Joi.string(),
        DATABASE_PORT: Joi.number(),
        DATABASE_HOST: Joi.string(),
        DATABASE_USER: Joi.string(),
        DATABASE_PASSWORD: Joi.string(),
        PGADMIN_EMAIL: Joi.string().email(),
        PGADMIN_PASSWORD: Joi.string(),
        PGADMIN_PORT_INSTANCE: Joi.number(),
        PGADMIN_PORT_IMAGE: Joi.number(),
        POSTGRES_DB: Joi.string(),
        POSTGRES_PORT: Joi.number(),
        POSTGRES_HOST: Joi.string(),
        POSTGRES_PASSWORD: Joi.string(),
        POSTGRES_USER: Joi.string(),
        MYSQL_DB: Joi.string(),
        MYSQL_PORT: Joi.number(),
        MYSQL_HOST: Joi.string(),
        MYSQL_PASSWORD: Joi.string(),
        MYSQL_USER: Joi.string(),
      }),
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
