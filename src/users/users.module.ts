import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//module
import { ProductsModule } from 'src/products/products.module';
//controllers
import { UsersController } from './controllers/users/users.controller';
import { CostumersController } from './controllers/costumers/costumers.controller';
//services
import { UsersService } from './services/users/users.service';
import { CostumersService } from './services/costumers/costumers.service';
//entities
import { CostumerModel } from './models/costumers.entity';
import { UserModel } from './models/users.entity';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([CostumerModel, UserModel]),
  ],
  controllers: [UsersController, CostumersController],
  providers: [UsersService, CostumersService],
})
export class UsersModule {}
