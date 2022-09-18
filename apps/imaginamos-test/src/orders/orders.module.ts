import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { Technic } from '../technics/entities/technic.entity';
import { User } from '../users/entities/user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    TypeOrmModule.forFeature([Order,Technic,User]),
    ClientsModule.register([
      { name: 'TOKEN_SERVICE', transport: Transport.TCP },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
