import { Module } from '@nestjs/common';
import { TvServController } from './tv-serv.controller';
import { TvServService } from './tv-serv.service';

@Module({
  imports: [],
  controllers: [TvServController],
  providers: [TvServService],
})
export class TvServModule {}
