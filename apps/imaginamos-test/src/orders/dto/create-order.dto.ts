import { IsNotEmpty, IsOptional} from "class-validator";

export class CreateOrderDto {

    @IsNotEmpty() 
    userId: number;

    @IsOptional() 
    technicId?: number;

    @IsNotEmpty() 
    type: string;

    @IsOptional()    
    tokenUuid?: string;

}
