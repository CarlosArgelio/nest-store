import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './controllers/categories/categories.controller';
import { BrandsController } from './controllers/brands/brands.controller';
import { UsersController } from './controllers/users/users.controller';
import { CostumersController } from './controllers/costumers/costumers.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { ProductsController } from './controllers/products/products.controller';
import { ProductsService } from './services/products/products.service';
import { UsersService } from './services/users/users.service';
import { OrdersService } from './services/orders/orders.service';
import { CostumersService } from './services/costumers/costumers.service';
import { CategoriesService } from './services/categories/categories.service';
import { BrandsService } from './services/brands/brands.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CostumersModule } from './costumers/costumers.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [UsersModule, ProductsModule, OrdersModule, CostumersModule, CategoriesModule, BrandsModule],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    BrandsController,
    UsersController,
    CostumersController,
    OrdersController,
  ],
  providers: [
    AppService,
    ProductsService,
    UsersService,
    OrdersService,
    CostumersService,
    CategoriesService,
    BrandsService,
  ],
})
export class AppModule {}
