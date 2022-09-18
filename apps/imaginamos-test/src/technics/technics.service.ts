import { Injectable, Logger } from '@nestjs/common';
import { CreateTechnicDto } from './dto/create-technic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technic } from './entities/technic.entity';

@Injectable()
export class TechnicsService {
  logger: Logger;
  constructor(@InjectRepository(Technic) private technicRep: Repository<Technic>){
    this.logger = new Logger('Reports Service');
  }

  async create(createTechnicDto: CreateTechnicDto):Promise<Technic> { 
      try{
        const tchnics = this.technicRep.create(createTechnicDto);
        return await this.technicRep.save(tchnics);
      }catch (e) { 
        console.log(e);      
      }
  }

  async findAll(): Promise<Technic[]> {
    try {
      const technics = await this.technicRep.find();
      return technics;
    } catch (e) {
      console.log(e);
    }
  }  
}
