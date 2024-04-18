import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//module
import { ProductModel } from 'src/products/models/products.entity';
import { ProductsModule } from 'src/products/products.module';

//controllers
import { CostumersController } from './controllers/customers/customers.controller';
import { OrderItemController } from './controllers/order-item/order-item.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { UsersController } from './controllers/users/users.controller';

//entities
import { CustomerModel } from './models/customers.entity';
import { OrderItemModel } from './models/order-item.entity';
import { OrderModel } from './models/orders.entity';
import { UserModel } from './models/users.entity';
import { CustomersService } from './services/customers/customers.service';
import { OrderItemService } from './services/order-item/order-item.service';
import { OrdersService } from './services/orders/orders.service';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([
      CustomerModel,
      UserModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]),
  ],
  controllers: [
    UsersController,
    CostumersController,
    OrdersController,
    OrderItemController,
  ],
  providers: [UsersService, CustomersService, OrdersService, OrderItemService],
})
export class UsersModule {}
