import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  logger: Logger;
  constructor(@InjectRepository(User) private userRep: Repository<User>){
    this.logger = new Logger('Reports Service');
  }

  async create(createUserDto: CreateUserDto):Promise<User> { 
      try{
        const user = this.userRep.create(createUserDto);
        return await this.userRep.save(user);
      }catch (e) { 
        console.log(e);      
      }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRep.find();
      return users;
    } catch (e) {
      console.log(e);
    }
  }  

}
