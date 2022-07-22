/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator'
export class usuarioDto {
    @ApiProperty()
    nombres: string;
    @ApiProperty()
    apellidos: string;
    @ApiProperty()
    @IsString()
    clave: string;
    @ApiProperty()
    @IsEmail()
    readonly correo: string;
}