import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//module
import { ProductsModule } from 'src/products/products.module';

//controllers
import { CostumersController } from './controllers/customers/customers.controller';
import { UsersController } from './controllers/users/users.controller';
//services
//entities
import { CustomerModel } from './models/customers.entity';
import { UserModel } from './models/users.entity';
import { CustomersService } from './services/customers/customers.service';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([CustomerModel, UserModel]),
  ],
  controllers: [UsersController, CostumersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
