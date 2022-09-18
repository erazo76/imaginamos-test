import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { TvServService } from './tv-serv.service';

@Controller()
export class TvServController {
  constructor(private readonly tvServService: TvServService) {}

  @MessagePattern ('create_token')
  async tokenCreate(): Promise<string> {
    let token = await this.tvServService.uuidGenerate();    
    return token;
  }
}
