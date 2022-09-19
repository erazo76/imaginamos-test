import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length, Matches } from "class-validator";

export class CreateUserDto {
    
    @ApiProperty({description:'User name and surname capitalized'})
    @IsNotEmpty()    
    @Length(2,50)
    @Matches(/^(\b[A-Z][a-zñáéíóú]+['\-]{0,1}[a-zñáéíóú]+)(\s+(\b[A-Z][a-zñáéíóú]+['\-]{0,1}[a-zñáéíóú]+))*$/, {message: 'Invalid name'}) 
    name: string; 

}
