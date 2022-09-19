import { Controller, Get, Post, Body, Res, HttpStatus, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({summary:'Register a order by user id and service type (auto generate Token from a microservice and assign a random technic )'})
  async create(@Res() res:Response, @Body() createOrderDto: CreateOrderDto): Promise<any> {
    let order = await this.ordersService.create(createOrderDto);
    if(!order){
      return res.status(HttpStatus.NOT_FOUND).json({message:'There is no data user/technic'});
    }else{
      return res.status(HttpStatus.CREATED).json(order);      
    } 
  } 

  @Get('/:id/technics')
  @ApiOperation({summary:'Obtain order list by technic id'})
  async findAllByTechnicId(@Res() res:Response, @Param ('id') id:number):Promise<any> {
    let orders = await this.ordersService.findAllByTechnicId(id);    
    if(orders.length === 0){
      return res.status(HttpStatus.NOT_FOUND).json({message:'There is no data'});       
    } 
    return res.status(HttpStatus.OK).json(orders); 
  }

  @Get()
  @ApiOperation({summary:'Obtain order list'})
  async findAll(@Res() res:Response):Promise<any> {
    let orders = await this.ordersService.findAll();    
    if(orders.length === 0){
      return res.status(HttpStatus.NOT_FOUND).json({message:'There is no data'});       
    } 
    return res.status(HttpStatus.OK).json(orders); 
  }
}
