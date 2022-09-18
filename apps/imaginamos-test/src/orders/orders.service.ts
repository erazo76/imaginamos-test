import { Inject,Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Technic } from '../technics/entities/technic.entity';
import { User } from '../users/entities/user.entity';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  logger: Logger;  
  constructor(@InjectRepository(Order) private orderRep: Repository<Order>,
              @InjectRepository(Technic) private technicRep: Repository<Technic>,
              @InjectRepository(User) private userRep: Repository<User>,
              @Inject('TOKEN_SERVICE') private client: ClientProxy,
              ){
    this.logger = new Logger('Reports Service');
  }

  async create(createOrderDto: CreateOrderDto):Promise<any> { 
    let {userId, technicId, type, tokenUuid} = createOrderDto;
      try{ 
        const randTech = await this.technicRep    
        .createQueryBuilder("technic")    
        .orderBy('RANDOM()')
        .limit(1)
        .getRawMany();  
        if(randTech[0] != undefined){
          technicId = randTech[0].technic_id;  
          tokenUuid = await firstValueFrom(await this.randomToken());          
          const order = this.orderRep.create(createOrderDto);
          const user = await this.userRep.findOne({
            where:{
              id: userId
            }
          });
          if(!user){          
            return undefined;
          } 
          const technic = await this.technicRep.findOne({
            where:{
              id:technicId
            }
          });
          order.user = user;
          order.technic = technic;
          order.tokenUuid = tokenUuid;
          return await this.orderRep.save(order); 
        } 
        return undefined;
      }catch (e) { 
        console.log(e);      
      }
  }

  async findAllByTechnicId(id:number): Promise<Order[]> {
    try {
      const orders = await this.orderRep.createQueryBuilder('order') 
      .where("order.technic = :technic", { technic: id })     
      .leftJoin('order.technic', 'technic')
      .leftJoin('order.user', 'user')
      .select(['technic.name','user.name','order.type','order.tokenUuid','order.createAt'])
      .getMany();
      return orders;
    } catch (e) {
      console.log(e);
    }
  }  

  async findAll(): Promise<Order[]> {
    try {
      const orders = await this.orderRep.createQueryBuilder('order')        
      .leftJoin('order.technic', 'technic')
      .leftJoin('order.user', 'user')
      .select(['technic.name','user.name','order.type','order.tokenUuid','order.createAt'])
      .getMany();
      return orders;
    } catch (e) {
      console.log(e);
    }
  }  


   async randomToken(){
    let token =  this.client.send<string>('create_token','');     
    return token;
  }

}
