/* eslint-disable prettier/prettier */
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength} from 'class-validator'
export class usuarioDto {
    @ApiProperty()
    @IsString()
    nombres: string;
    @ApiProperty()
    @IsString()
    apellidos: string;
    @ApiProperty()
    @IsEmail()
    readonly correo: string;
    @ApiProperty()
    @IsString()
    @MinLength(5)
    clave: string;

    @ApiProperty({examples: ['f = femenino', 'm = masculino']})
    sexo: string;
}

export class LoginDto extends OmitType(usuarioDto, ['nombres','apellidos', 'sexo']){}