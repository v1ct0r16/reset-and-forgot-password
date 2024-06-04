import { IsNotEmpty, IsString } from "class-validator";

export class CreateAccountDto {

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    
}
