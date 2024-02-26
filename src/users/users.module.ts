import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { UsersController } from './controllers/users/users.controller';
import { CostumersController } from './controllers/costumers/costumers.controller';
import { UsersService } from './services/users/users.service';
import { CostumersService } from './services/costumers/costumers.service';

@Module({
  imports: [ProductsModule],
  controllers: [UsersController, CostumersController],
  providers: [UsersService, CostumersService],
})
export class UsersModule {}
