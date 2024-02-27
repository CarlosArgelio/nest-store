import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//module
import { ProductsModule } from 'src/products/products.module';

//controllers
import { CostumersController } from './controllers/costumers/costumers.controller';
import { UsersController } from './controllers/users/users.controller';
//services
//entities
import { CostumerModel } from './models/costumers.entity';
import { UserModel } from './models/users.entity';
import { CostumersService } from './services/costumers/costumers.service';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([CostumerModel, UserModel]),
  ],
  controllers: [UsersController, CostumersController],
  providers: [UsersService, CostumersService],
})
export class UsersModule {}
