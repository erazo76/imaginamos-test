import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { TechnicsService } from './technics.service';
import { CreateTechnicDto } from './dto/create-technic.dto';
import { Response } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Technics')
@Controller('technics')
export class TechnicsController {
  constructor(private readonly technicsService: TechnicsService) {}

  @Post()
  @ApiOperation({summary:'Register a technic by full name'})
  async create(@Res() res:Response, @Body() createTechnicDto: CreateTechnicDto): Promise<any> {
    let technic = await this.technicsService.create(createTechnicDto);
    if(!technic){
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Error on server'});
    }else{
      return res.status(HttpStatus.CREATED).json(technic);      
    } 
  } 

  @Get()
  @ApiOperation({summary:'Obtain technic list'})
  async findAll(@Res() res:Response):Promise<any> {
    let technics = await this.technicsService.findAll();    
    if(technics.length === 0){
      return res.status(HttpStatus.NOT_FOUND).json({message:'There is no data'});       
    } 
    return res.status(HttpStatus.OK).json(technics); 
  }
}
