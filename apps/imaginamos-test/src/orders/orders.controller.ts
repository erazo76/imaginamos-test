import { Controller, Get, Post, Body, Res, HttpStatus, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Response } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Res() res:Response, @Body() createOrderDto: CreateOrderDto): Promise<any> {
    let order = await this.ordersService.create(createOrderDto);
    if(!order){
      return res.status(HttpStatus.NOT_FOUND).json({message:'There is no data user/technic'});
    }else{
      return res.status(HttpStatus.CREATED).json(order);      
    } 
  } 

  @Get('/:id/technics')
  async findAllByTechnicId(@Res() res:Response, @Param ('id') id:number):Promise<any> {
    let orders = await this.ordersService.findAllByTechnicId(id);    
    if(orders.length === 0){
      return res.status(HttpStatus.NOT_FOUND).json({message:'There is no data'});       
    } 
    return res.status(HttpStatus.OK).json(orders); 
  }

  @Get()
  async findAll(@Res() res:Response):Promise<any> {
    let orders = await this.ordersService.findAll();    
    if(orders.length === 0){
      return res.status(HttpStatus.NOT_FOUND).json({message:'There is no data'});       
    } 
    return res.status(HttpStatus.OK).json(orders); 
  }
}
