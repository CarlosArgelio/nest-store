import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//module
import { ProductsModule } from 'src/products/products.module';

//controllers
import { CostumersController } from './controllers/customers/customers.controller';
import { UsersController } from './controllers/users/users.controller';

//entities
import { CustomerModel } from './models/customers.entity';
import { UserModel } from './models/users.entity';
import { CustomersService } from './services/customers/customers.service';
import { UsersService } from './services/users/users.service';
import { OrderModel } from './models/orders.entity';
import { OrderItemModel } from './models/order-item.entity';
import { OrdersController } from './controllers/orders/orders.controller';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([
      CustomerModel,
      UserModel,
      OrderModel,
      OrderItemModel,
    ]),
  ],
  controllers: [UsersController, CostumersController, OrdersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
