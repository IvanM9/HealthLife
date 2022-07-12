/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator'
export class usuarioDto {
    // TODO: Cambiar los nombres de los atributos
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
    @ApiProperty()
    direccion: string;
    @ApiProperty()
    telefono: string;
    @ApiProperty()
    readonly rol: string;
}