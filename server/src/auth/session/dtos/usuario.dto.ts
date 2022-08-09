/* eslint-disable prettier/prettier */
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator'
export class usuarioDto {
    @ApiProperty()
    nombres: string;
    @ApiProperty()
    apellidos: string;
    @ApiProperty()
    @IsEmail()
    readonly correo: string;
    @ApiProperty()
    @IsNotEmpty()
    clave: string;
}

export class LoginDto extends OmitType(usuarioDto, ['nombres','apellidos']){}