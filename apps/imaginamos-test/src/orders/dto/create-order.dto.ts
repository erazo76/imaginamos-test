import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional} from "class-validator";

export class CreateOrderDto {

    @ApiProperty({description:'User id reference'})
    @IsNotEmpty() 
    userId: number;

    @ApiProperty({description:'Technic id reference'})
    @IsOptional() 
    technicId?: number;

    @ApiProperty({description:'Service type (maintenance or installation)'})
    @IsNotEmpty() 
    type: string;

    @ApiProperty({description:'Token generated fron microservice'})
    @IsOptional()    
    tokenUuid?: string;

}
