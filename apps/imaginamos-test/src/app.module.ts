import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import { TechnicsModule } from './technics/technics.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseModule,    
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }), 
    TechnicsModule, 
    UsersModule, 
    OrdersModule,
    ClientsModule.register([
      { name: 'TOKEN_SERVICE', transport: Transport.TCP },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
