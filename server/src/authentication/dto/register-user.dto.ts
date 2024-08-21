import { IsString, Length } from "class-validator";


export class RegisterUsersDto {
     @IsString()
     email: string;
     @IsString()
     password: string
     @IsString()
     name: string
}