import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicsService } from './technics.service';
import { TechnicsController } from './technics.controller';
import { Technic } from './entities/technic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Technic]),
  ],
  controllers: [TechnicsController],
  providers: [TechnicsService]
})
export class TechnicsModule {}
