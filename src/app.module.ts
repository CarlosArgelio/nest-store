import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ProductsController } from './products/controllers/products.controller';
// import { CategoriesController } from './products/controllers/categories.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { UsersController } from './controllers/users/users.controller';
import { CustomersController } from './controllers/customers/customers.controller';
import { BrandsController } from './controllers/brands/brands.controller';
// import { ProductsService } from './products/services/products.service';
import { BrandsService } from './services/brands/brands.service';
// import { CategoriesService } from './products/services/categories.service';
import { CustomersService } from './services/customers/customers.service';
import { OrdersService } from './services/orders/orders.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [
    AppController,
    // ProductsController,
    // CategoriesController,
    OrdersController,
    UsersController,
    CustomersController,
    BrandsController,
  ],
  providers: [
    AppService,
    // ProductsService,
    BrandsService,
    // CategoriesService,
    CustomersService,
    OrdersService,
  ],
})
export class AppModule {}
